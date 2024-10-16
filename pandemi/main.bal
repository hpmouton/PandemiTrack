import ballerinax/kafka;
import ballerina/http;
import ballerina/io;
type PandemicRecord record {
    string townName;
    int newCases;
    int newRecoveries;
    string regionName;
};
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["POST"]
    }
}
service / on new http:Listener(42069) {
    private final kafka:Producer caseProducer;

    function init() returns error? {
        self.caseProducer = check new (kafka:DEFAULT_URL);
    }
      resource function post cases(@http:Payload PandemicRecord newCase) returns http:Accepted|error {
        io:println("Received new case data: ", newCase);
        check self.caseProducer->send({
            topic: "cases-topic",
            value: newCase
        });

        return http:ACCEPTED;
    }
}
