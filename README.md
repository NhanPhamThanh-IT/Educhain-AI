# Introduction

**EduChain AI** is an innovative Web3-based educational platform that integrates artificial intelligence (AI) and blockchain technology to revolutionize online learning. With features like AI-powered personalized learning tools, a tokenized economy for document exchange and rewards systems, and blockchain-secured transactions. Educhain offers a comprehensive ecosystem for both learners and educators. The platform leverages **LLMs (e.g., Llama-3,3-chatQA-finetuned, Llama-3.2-Vision, DeepSeek-Coder-V2) and knowledge-augmented generation** (combine of knowledge graph and vector retrieval) techniques to create a seamless and engaging experience and allow users to achieve their educational goals, while **Web3 technology** (e.g., **smart contracts, cryptocurrencies**) builds a secure and transparent system that includes a rewards mechanism based on users effort.

EduChain’s unique features include AI-driven content generation (quiz, exam,...), customizable study guides, and a transparent marketplace for course creation and purchase. Learners can upload their materials, use an interactive agentic chatbot for tailored learning support, and participate in gamified activities to enhance their educational journey.


## Mission:
To provide a dynamic and decentralized platform that makes education accessible, engaging, and rewarding through the integration of AI and Web3 technologies:

- For Learners: The platform personalizes learning experiences by creating quizzes, study guides, and multimedia content from uploaded files. Learners are incentivized with token rewards for their achievements and active participation.

- For Educators and Creators: Educhain allows educators to design, upload, and monetize their courses while earning tokens based on learner engagement and sales.

- For All Users: Blockchain ensures secure, transparent transactions, while a token economy promotes motivation, fairness, and inclusivity within the learning ecosystem.

## Why Web3 x AI?
- The synergy of Web3 and AI offers opportunities for innovation in education:

- Personalization at Scale: AI tailors learning paths and content to individual needs, while Web3 ensures transparency and ownership of data.

- Tokenized Incentives: Blockchain enables a decentralized reward system, motivating learners to stay engaged while providing fair compensation to creators.

- Secure and Transparent Ecosystem: Web3 guarantees secure transactions and traceable ownership of educational resources, reducing fraud and increasing trust.

- Empowering Creators and Learners: With AI automating content generation and Web3 ensuring equitable distribution, the platform fosters a collaborative and inclusive learning environment.**

# Installation

## Back-end
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Educhain-AI.git
    cd Educhain-AI
    ```

2. Set up a virtual environment and install dependencies:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. Configure environment variables:
    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the necessary environment variables.

    ```
    OPENAI_API_KEY = ""

    # Postgre:
    DB_NAME = 'DB_NAME'
    DB_USER = 'DB_USERNAME'
    DB_PASSWORD = 'DB_PASSWORD'
    DB_HOST = 'DB_HOST'
    DB_PORT = 'DB_PORT'

    # Neo4j
    NEO4J_URI = ''
    NEO4J_USER = ''
    NEO4J_PASS = ''

4. Run database migrations:
    ```sh
    python manage.py migrate
    ```

5. Start the development server:
    ```sh
    python manage.py runserver
    ```

## Front-end
1. Navigate to the front-end directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

# Deployment
1. Build the front-end for production:
    ```sh
    cd frontend
    npm run build
    ```

2. Collect static files for the back-end:
    ```sh
    cd ..
    python manage.py collectstatic
    ```

3. Configure your web server (e.g., Nginx) and WSGI server (e.g., Gunicorn) to serve the application.

4. Set up a production database and run migrations.

5. Ensure all environment variables are set for production.

6. Start the application using your WSGI server.

For detailed deployment instructions, refer to the documentation of your chosen hosting provider.
