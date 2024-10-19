import org.apache.spark.sql.{SparkSession, DataFrame}
import org.apache.spark.sql.streaming.Trigger
import org.apache.spark.sql.functions._

object PandemicDataAnalysis {

  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder.appName("Pandemic Data Analysis").master("spark://spark-master:7077").getOrCreate()

    import spark.implicits._

    val Schema = new org.apache.spark.sql.types.StructType().add("townName", "string").add("regionName", "string").add("patientId", "string").add("age", "integer").add("gender", "string").add("newCases", "integer").add("newRecoveries", "integer")

    val pandemicDF = spark.readStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092") // Kafka broker.option("subscribe", "cases-topic").load().selectExpr("CAST(value AS STRING) as json").select(from_json($"json", pandemicRecordSchema).as("data")).select("data.*")

     val pandemicDF = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092") // Kafka broker
      .option("subscribe", "cases-topic") // Kafka topic
      .load()
      .selectExpr("CAST(value AS STRING) as json")  // Extract the message value as a JSON string
      .select(from_json($"json", pandemicRecordSchema).as("data"))  // Parse the JSON into a structured DataFrame
      .select("data.*")  // Extract the fields from the parsed JSON


    val casesPerTownRegion = pandemicDF.groupBy("regionName", "townName").agg(sum("newCases").as("totalCases"), sum("newRecoveries").as("totalRecoveries"))

    val newCaseTrend = pandemicDF.withColumn("timestamp", current_timestamp()) // Adding a timestamp column.groupBy(window($"timestamp", "1 hour"), $"regionName", $"townName").agg(sum("newCases").as("newCasesInLastHour"))

    val recoveryTrend = pandemicDF.withColumn("timestamp", current_timestamp()) // Adding a timestamp column.groupBy(window($"timestamp", "1 hour"), $"regionName", $"townName").agg(sum("newRecoveries").as("newRecoveriesInLastHour"))

    val casesByGender = pandemicDF.groupBy("townName", "gender").agg(sum("newCases").as("totalCasesByGender"))

    val query = casesPerTownRegion.writeStream.outputMode("update").format("console").trigger(Trigger.ProcessingTime("10 seconds")).start()

    val queryTrend = newCaseTrend.writeStream.outputMode("update").format("console").trigger(Trigger.ProcessingTime("10 seconds")).start()

    val queryRecoveryTrend = recoveryTrend.writeStream.outputMode("update").format("console").trigger(Trigger.ProcessingTime("10 seconds")).start()

    val queryGender = casesByGender.writeStream.outputMode("update").format("console").trigger(Trigger.ProcessingTime("10 seconds")).start()

    query.awaitTermination()
    queryTrend.awaitTermination()
    queryRecoveryTrend.awaitTermination()
    queryGender.awaitTermination()
  }
}
