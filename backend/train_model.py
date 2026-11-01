import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# =========================
# Generate Training Dataset
# =========================

data = []

for waterLevel in range(20, 501, 20):
    for rainfall in range(0, 201, 20):
        for temperature in range(20, 41, 5):
            for humidity in range(40, 101, 10):
                for waterFlow in range(0, 301, 30):

                    risk_score = 0

                    if waterLevel >= 250:
                        risk_score += 3
                    elif waterLevel >= 150:
                        risk_score += 2
                    elif waterLevel >= 80:
                        risk_score += 1

                    if rainfall >= 120:
                        risk_score += 3
                    elif rainfall >= 60:
                        risk_score += 2
                    elif rainfall >= 20:
                        risk_score += 1

                    if waterFlow >= 180:
                        risk_score += 3
                    elif waterFlow >= 90:
                        risk_score += 2
                    elif waterFlow >= 30:
                        risk_score += 1

                    if humidity >= 85:
                        risk_score += 1

                    if temperature <= 24 and humidity >= 80:
                        risk_score += 1

                    if risk_score >= 7:
                        floodRisk = 2   # DANGER / RED
                    elif risk_score >= 4:
                        floodRisk = 1   # WARNING / YELLOW
                    else:
                        floodRisk = 0   # SAFE / GREEN

                    data.append({
                        "waterLevel": waterLevel,
                        "rainfall": rainfall,
                        "temperature": temperature,
                        "humidity": humidity,
                        "waterFlow": waterFlow,
                        "floodRisk": floodRisk
                    })


df = pd.DataFrame(data)

print("Total training records:", len(df))
print(df["floodRisk"].value_counts())


# =========================
# Features and Target
# =========================

X = df[
    [
        "waterLevel",
        "rainfall",
        "temperature",
        "humidity",
        "waterFlow",
    ]
]

y = df["floodRisk"]


# =========================
# Train-Test Split
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# =========================
# Train Random Forest Model
# =========================

model = RandomForestClassifier(
    n_estimators=150,
    random_state=42,
    max_depth=12
)

model.fit(X_train, y_train)


# =========================
# Evaluation
# =========================

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        target_names=["SAFE", "WARNING", "DANGER"]
    )
)


# =========================
# Save Model
# =========================

joblib.dump(model, "flood_model.pkl")

print("\nNew flood_model.pkl created successfully!")