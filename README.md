# Finoo

> A little dockerised microservices application

## 📢 Introduction

Finoo is a small project developed for a technical interview with SpaceShard. The aim was to create a simple financial product application where users can deposit money into a vault and also lend money.

This application is designed to simulate basic financial transactions, providing a platform for users to manage their finances. Whether you're looking to save money in a vault or lend money, Finoo is your go-to solution.

Built with a focus on simplicity and ease of use, Finoo is a demonstration of how financial products can be made accessible to everyone. We hope you find it useful and look forward to your feedback.

## 🏎 Run the code
To run the code (all the microservices) locally:
- 00 - Install docker
- 01 - Make sure docker is running
- 02 - `docker-compose -f local.docker-compose.yml up -d --build`
- 03 - Wait a little during the loading
- 04 - Open the [frontend](http://localhost:3000) in your browser

## 📕 Going further

This example is a basic one, it can be easily improved by:
- implementing a way to register, with for example smtp
- manage user balance, so creating mock balance and so users will not have infinite money
- also create the possibility to a admin to verify the ask of a loan and so to remove direct acceptance
- ...