FROM jenkins/jenkins:lts-jdk17
USER root

# Install git and essential tools if needed
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

USER jenkins