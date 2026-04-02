
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class programming_exercise{
    public static void main(String[] args){
        String username="";
        String password="1234ab";

        // Case 1a: Validate Username
        System.out.println("Validate Username: ");
        if (validateUserNameIsNotEmpty(username))
            System.out.println("Username is valid");
        else System.out.println("Username is INVALID");

        // Case 1b: Validate Password
        System.out.println("Validate Password: ");
        if (validatePassword(password))
            System.out.println("Password is valid");
        else System.out.println("Password is INVALID");

        // Case 2: Fnd Maximum Number
        int[] numberList = {12, 5, 78, 34, 23};
        System.out.println("Maximum number is " + findMaximumNumber(numberList));

        // Case 3: Count Failed Tests
        String[] testResultList = {"PASS","PASS","FAIL","PASS","FAIL","FAIL"};
        System.out.println("Number of failed tests is " + countTestFailed(testResultList));

        //Case 4: Remove Duplicate Values
        int[] originalList = {1, 2, 3, 2, 5, 1, 7};
        System.out.println("List after removed duplicate:" + Arrays.toString(removeDuplicateValues(originalList)));

        //Case 5: Sort Numbers
        int[] unsortList = {9, 4, 6, 1, 3};
        System.out.println("List after sorted:" + Arrays.toString(sortNumbers2(unsortList)));

        // Case 6: Detect Flaky Test
        String[] testResults = {"PASS","PASS","FAIL","PASS","PASS","FAIL"};
        System.out.println("Detect fkaky test result: " + detectFlakyTest(testResults));

        // Case 7: Extract Domain From URL
        String URL = "https://github.com/microsoft/playwright";
        System.out.println("Extracted domain is: " + extractDomainFromURL(URL));

        // Case 8: Group Data
        String[][] dataList = {
                            {"chrome", "PASS"},
                            {"chrome", "FAIL"},
                            {"firefox", "PASS"}
                            };

        System.out.println(groupData(dataList));
    }

    public static boolean validateUserNameIsNotEmpty(String username){
        // validate username must not be empty
        return username!= null && !username.trim().isEmpty();
    }

    public static boolean validatePassword(String password){
        //Validate Password length >=8
        if (password.length() >=8){
            //validate if password contains a number
            return password.matches(".*[0-9].*");
        }
        return false;
    }

    public static int findMaximumNumber(int[] NumberList){
        int maxnumber = NumberList[0];

        for (int i = 0; i<NumberList.length; i++){
             if (maxnumber < NumberList[i])
                maxnumber = NumberList[i];
        }
        return maxnumber;
    }

    public static int countTestFailed(String[] TestResultList){
        int numberOfFailedTest = 0;
        
        for (int i = 0; i < TestResultList.length; i++){
            if (TestResultList[i].equals("FAIL"))
                numberOfFailedTest++;
        }
        return numberOfFailedTest; 
    }

    public static int[] removeDuplicateValues(int[] originalList){
        List<Integer> uniqueList = new ArrayList<>();
        int uniqueIndex = 0;
        uniqueList.add(originalList[0]);
        uniqueIndex++;

        for (int i = 1; i < originalList.length; i++){
            boolean isDuplicate = false;
            for (int j = 0; j < uniqueIndex; j++){
                if (originalList[i] == uniqueList.get(j)){
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate){
                uniqueList.add(originalList[i]);
                uniqueIndex++;
            }
        }
        return uniqueList.stream().mapToInt(Integer::intValue).toArray(); 
    }

    public static int[] sortNumbers2(int[] originalList) {
    int[] sorted = Arrays.copyOf(originalList, originalList.length);
    for (int i = 0; i < sorted.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < sorted.length; j++) {
            if (sorted[j] < sorted[minIndex]) {
                minIndex = j;
            }
        }
        int temp = sorted[i];
        sorted[i] = sorted[minIndex];
        sorted[minIndex] = temp;
    }
    return sorted;
}

    public static String detectFlakyTest (String[] testResults){
        int numberOfPass = 0;
        int numberOfFail = 0;

        for (int i = 0; i < testResults.length; i++){
            if (testResults[i].equals("PASS"))
                numberOfPass++;
            else 
                numberOfFail++;
        }
        if (numberOfPass > 1 && numberOfFail > 1)
            return "FLAKY";
        else return "NO FLAKY";
    }

    public static String extractDomainFromURL (String URL){
        int startPoint = URL.indexOf("/")+2;
        int endPoint = URL.indexOf("/", startPoint);
        String extractedDomain = URL.substring(startPoint, endPoint);
       
        return extractedDomain;
    }

    public static String groupData(String[][] dataList) {
        Map<String, Integer> counts = new HashMap<>();
        for (String[] record : dataList) {
            if (record.length < 2) {
                continue;
            }
            String browser = record[0];
            counts.put(browser, counts.getOrDefault(browser, 0) + 1);
        }

        StringBuilder result = new StringBuilder();
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if (result.length() > 0) {
                result.append("\n");
            }
            result.append(entry.getKey()).append(": ").append(entry.getValue());
        }
        return result.toString();
    }
}
