#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

// const char* ssid = "teamyahay_2.4G";
// const char* password = "m@ng0t@rAmustapha123";
const char* ssid = "ccs3h";
const char* password = "ccs3h2k24";
const char* serverAddress = "192.168.1.9";
const int serverPort = 5000;

int relayPin = D7;
int sensor_pin = A0;
int output_value;
bool isPumpOn = false;
unsigned long lastSwitchChange = 0;
unsigned long switchChangeInterval = 15000; // 10 seconds

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);
  pinMode(sensor_pin, INPUT);
  Serial.println("Reading From the Sensor ...");
  delay(5000);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  output_value = analogRead(sensor_pin);
  output_value = map(output_value, 550, 10, 0, 100);
  Serial.print("Moisture : ");
  Serial.print(output_value);
  Serial.print("%");
  Serial.println();

  sendSensorDataToServer(output_value);
  checkWaterPumpControlStatus();

  // Check if it's time to perform automatic moisture detection
  if (millis() - lastSwitchChange > switchChangeInterval) {
    lastSwitchChange = millis();
    if (!isPumpOn) {
      // Perform moisture detection and control water pump accordingly
      if (output_value < 4) {
        digitalWrite(relayPin, LOW); // If moisture is low, turn on the pump
        isPumpOn = true;
        Serial.println("Moisture level below threshold. Pump turned on.");
      } else {
        digitalWrite(relayPin, HIGH); // If moisture is not low, turn off the pump
        isPumpOn = false;
        Serial.println("Moisture level above threshold. Pump turned off.");
      }
    }
  }

  delay(5000); // Pause for 5 seconds before taking the next reading
}

void sendSensorDataToServer(int data) {
  WiFiClient client;

  if (!client.connect(serverAddress, serverPort)) {
    Serial.println("Connection to server failed!");
    return;
  }

  String jsonPayload = "{\"moisture_level\": " + String(data) + "}";
  HTTPClient http;
  http.begin(client, String("http://") + serverAddress + ":" + serverPort + "/api" + "/saveMoisture");
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    Serial.print("Moisture level sent successfully. Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending moisture level. Response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void checkWaterPumpControlStatus() {
  WiFiClient client;

  if (!client.connect(serverAddress, serverPort)) {
    Serial.println("Connection to server failed!");
    return;
  }

  HTTPClient http;
  http.begin(client, String("http://") + serverAddress + ":" + serverPort + "/api/getAllControlRelay");
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Relay control response: ");
    Serial.println(response);

    if (response.indexOf("on") != -1) {
      digitalWrite(relayPin, LOW);
      Serial.println("Relay turned on");
      isPumpOn = true;
    } else if (response.indexOf("off") != -1) {
      if (isPumpOn) {
        digitalWrite(relayPin, HIGH);
        Serial.println("Relay turned off");
        isPumpOn = false;
      }
    } else {
      Serial.println("Invalid relay control response");
    }
  } else {
    Serial.print("Error controlling relay. Response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
