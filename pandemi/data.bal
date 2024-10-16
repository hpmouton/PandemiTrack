// Import the required modules
import ballerina/io;



// A list of pandemic records for different towns and regions in Namibia
table<PandemicRecord> pandemicData = table [
    {townName: "Windhoek", regionName: "Khomas", newCases: 20, newRecoveries: 15},
    {townName: "Swakopmund", regionName: "Erongo", newCases: 10, newRecoveries: 7},
    {townName: "Walvis Bay", regionName: "Erongo", newCases: 12, newRecoveries: 10},
    {townName: "Rundu", regionName: "Kavango East", newCases: 8, newRecoveries: 5},
    {townName: "Ondangwa", regionName: "Oshana", newCases: 5, newRecoveries: 4},
    {townName: "Oshakati", regionName: "Oshana", newCases: 7, newRecoveries: 6},
    {townName: "Katima Mulilo", regionName: "Zambezi", newCases: 6, newRecoveries: 4},
    {townName: "Gobabis", regionName: "Omaheke", newCases: 4, newRecoveries: 3},
    {townName: "Keetmanshoop", regionName: "Karas", newCases: 9, newRecoveries: 8},
    {townName: "Otjiwarongo", regionName: "Otjozondjupa", newCases: 11, newRecoveries: 9},
    {townName: "Rehoboth", regionName: "Hardap", newCases: 3, newRecoveries: 2},
    {townName: "Mariental", regionName: "Hardap", newCases: 5, newRecoveries: 3},
    {townName: "Tsumeb", regionName: "Oshikoto", newCases: 7, newRecoveries: 5},
    {townName: "Outapi", regionName: "Omusati", newCases: 4, newRecoveries: 4},
    {townName: "Luderitz", regionName: "Karas", newCases: 6, newRecoveries: 5}
];

// Function to print the pandemic data
# Description.
public function printPandemicData() {
    foreach var pandemicRecord in pandemicData {
        io:println("Town: ", pandemicRecord.townName, ", Region: ", pandemicRecord.regionName,
                   ", New Cases: ", pandemicRecord.newCases, ", New Recoveries: ", pandemicRecord.newRecoveries);
    }
}
