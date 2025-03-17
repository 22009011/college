from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

app = Flask(__name__)
CORS(app)  
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads')  
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Process the CSV file
        try:
            data = pd.read_csv(file_path)

            # Check if required columns exist
            if 'Attendance' not in data.columns or 'Year' not in data.columns:
                return jsonify({'error': 'Missing required columns in the CSV file'}), 400

            # Classification based on attendance
            data["Attendance_Status"] = data["Attendance"].apply(
                lambda x: "Above 75%" if x >= 75 else "Below 75%"
            )

            # Create visualizations for each year
            years = sorted(data["Year"].unique())
            plt.figure(figsize=(14, 10))

            for i, year in enumerate(years, 1):
                plt.subplot(2, 2, i)
                year_data = data[data["Year"] == year]["Attendance_Status"].value_counts()
                ax = sns.barplot(
                    x=year_data.index, y=year_data.values,
                    palette="viridis", edgecolor="black"
                )
                plt.title(f"Year {year} Attendance Classification", fontsize=16, fontweight="bold", color="navy")
                plt.xlabel("Attendance Status", fontsize=14, fontweight="bold", color="darkred")
                plt.ylabel("Number of Students", fontsize=14, fontweight="bold", color="darkgreen")
                for bar in ax.patches:
                    ax.annotate(
                        f"{int(bar.get_height())}",
                        (bar.get_x() + bar.get_width() / 2, bar.get_height()),
                        ha="center", va="bottom", fontsize=12, color="black", fontweight="bold"
                    )
                plt.tight_layout()

            # Save the plot to the uploads folder
            plot_filename = 'attendance_plot.png'
            plot_path = os.path.join(app.config['UPLOAD_FOLDER'], plot_filename)
            plt.savefig(plot_path)
            plt.close()

            return jsonify({
                'message': 'File processed successfully!',
                'plot_url': f'static/uploads/{plot_filename}'
            }), 200
        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500

    except Exception as e:
        return jsonify({'error': f'File upload failed: {str(e)}'}), 500


@app.route('/static/uploads/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True)
