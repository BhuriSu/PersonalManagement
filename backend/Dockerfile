# Use the official Python slim image as the base image
FROM python:3.12-slim AS builder

# Set the working directory in the container
WORKDIR /app

RUN apt-get update && apt-get install -y gcc libpq-dev
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port that the Django app runs on
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
