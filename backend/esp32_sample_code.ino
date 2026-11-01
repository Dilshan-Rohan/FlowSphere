#include <WiFi.h>
#include <HTTPClient.h>
#include "secrets.h"

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;

// Replace this with your laptop IPv4 address
// Example: http://192.168.1.5:8000/sensor-data
String serverURL = "http://10.47.49.118:8000/sensor-data";

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("WiFi Connected!");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{";
    jsonData += "\"waterLevel\": 250,";
    jsonData += "\"rainfall\": 90,";
    jsonData += "\"riverFlow\": 180,";
    jsonData += "\"drainageOverflow\": 60,";
    jsonData += "\"weatherForecast\": \"Heavy Rain\",";
    jsonData += "\"damRelease\": \"YES\"";
    jsonData += "}";

    int httpResponseCode = http.POST(jsonData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(10000);
}