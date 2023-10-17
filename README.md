# lorem ipsum gpt

A lightweight server mimicking the OpenAI API's response structure. Specifically tailored for local testing of the [dialoqbase](https://github.com/n4ze3m/dialoqbase) project.

## Features

- Simulates OpenAI's GPT response structure with streaming of "Lorem ipsum" text.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/n4ze3m/lorem-ipsum-gpt.git
   cd lorem-ipsum-gpt
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Compile the TypeScript code:
   ```bash
   npm run build
   ```

## Usage

To start the server in development mode with automatic restart on changes:
```bash
npm run dev
```

To compile TypeScript code to JavaScript:
```bash
npm run build
```

To start the server normally:
```bash
npm start
```

## API 


1. Get all models

    ```http
    GET /v1/models
    ```


2. Chat Completion

    ```http
    POST /v1/chat/completions
    ```

    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `messages` | `array` | **Required**. List of messages to feed to the model. |
    | `model` | `string` | **Required**. Model name. |
    | `stream` | `boolean` | **Optional**. Whether to stream the response or not. |




## Contribution

If you'd like to contribute to the project or spot any issues, please submit a pull request or create an issue on GitHub.


## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with OpenAI, or any of its subsidiaries or its affiliates. The official OpenAI website can be found at https://openai.com.

## License

MIT