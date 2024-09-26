import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class CurrencyApiService {
    private static final Logger logger = LoggerFactory.getLogger(CurrencyApiService.class);
    private static final String API_URL = "https://min-api.cryptocompare.com/data/price";

    public static double getExchangeRate(String from, String to) {
        try {
            String requestUrl = API_URL + "?fsym=" + from + "&tsyms=" + to;
            return getJsonObject(new URL(requestUrl)).getDouble(to);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return 0.0;
    }

    private static JSONObject getJsonObject(URL url) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new Exception("HTTP Error Code: " + connection.getResponseMessage());
        }

        try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            return new JSONObject(content.toString());
        }
    }
}