import ballerinax/kafka;
import ballerina/io;

type PandemicRecord record {
    string townName;
    int newCases;
    int newRecoveries;
    string regionName;
};


public function main() returns error? {
    kafka:Consumer pandemicConsumer = check new (kafka:DEFAULT_URL, {
        groupId: "pandemic-data-group",
        topics: "cases-topic"
    });

    while true {
        // Polls the consumer for payload.
        PandemicRecord [] records = check pandemicConsumer->pollPayload(15);
        from PandemicRecord 'record in records
            do {
                io:println(string `Received new case data for ${'record.townName}`);
            };
    }
}
