# John He | AI Engineer & Data Scientist

**Contact:** (603) 667-3454 | Evanston, IL | [johnhe@u.northwestern.edu](mailto:johnhe@u.northwestern.edu)  
**Links:** [LinkedIn](https://www.linkedin.com/in/jhe1/) | [GitHub](https://github.com/reigningforest) | [OrcId Profile](https://orcid.org/0009-0002-9787-0426) | [Portfolio](https://reigningforest.github.io)

## About Me
I'm an AI Engineer and Data Scientist with a focus on building scalable systems combining LLM agents, RAG pipelines, and cloud-native data infrastructure. I graduated from Northwestern University's MS in Machine Learning and Data Science program (Dec 2025) and have 3+ years of experience at leading organizations including Brigham and Women's Hospital, AstraZeneca, and early-stage biotech companies.

---

## Education
- **MS in Machine Learning and Data Science** — Northwestern University, Evanston, IL
- **BA in Molecular Biology and Biochemistry** — Middlebury College, Middlebury, VT (magna cum laude)

---

## Work Experience

### Data Science Contractor (Capstone) | Videspan | Sep 2025 - Dec 2025
*Evanston, IL*
- Deployed an agentic chatbot POC (Docker, FastAPI) using open-source LLMs (Qwen3) to reliably automate answers for 20 complex user scenarios where no training data existed, establishing the project's first foundational benchmarks.
- Implemented the agent's core logic using the Model Context Protocol (MCP) to execute multistep tool calls, creating active elicitation loops to efficiently clarify ambiguous questions for ClickHouse database queries.
- Integrated a multimodal RAG pipeline (Qwen3-VL) to process instructional videos, utilizing LanceDB for vector storage to transform unstructured media into a searchable knowledge base.

### Data Science Intern (Biostatistics) | Monopar Therapeutics | Sep 2025 - Nov 2025
*Wilmette, IL*
- Constructed predictive models using Causal Inference and Survival Analysis (Kaplan-Meier, Cox PH, GLMMs) to investigate biomarker relationships and establish statistically significant health indicators for patient stratification.

### Data Science Intern (Large Language Models) | Alexion, AstraZeneca Rare Disease | Jun 2025 - Aug 2025
*Wilmington, DE*
- Architected an LLM pipeline using Langchain to accelerate literature review writing by cutting article review time from 30 to 3 minutes, working with 2 researchers to identify relevant research articles and extract 20+ variables.
- Engineered a scalable, end-to-end data pipeline on a Slurm-managed HPC cluster to ingest and process 300+ scientific articles, designing a flexible data model that transformed XML into a structured, analysis-ready format.
- Resolved a failing few-shot learning LLM classifier by visualizing text embeddings with t-SNE, diagnosing the root cause as inconsistent data labeling and informing the creation of a new SOP for 10+ categories.
- Delivered 5 tailored presentations (four technical deep-dives, one executive summary to the department VP), resulting in an adoption request from the BioPharmaceuticals Medical Evidence department's Real World Data Office.

### Data Science Contractor (Industry Practicum) | Azul 3D | Sep 2024 - Jun 2025
*Skokie, IL*
- Led a 3-person team to analyze 50+ material compositions, building a predictive framework using Non-linear Regression and Random Forests to forecast reaction speeds and optimize manufacturing process precision.

### Data Coordinator (Data Engineer) | Brigham and Women's Hospital, Radiation Oncology | Sep 2021 - Mar 2025
*Boston, MA*
- Overhauled the research data infrastructure with 10+ automated ETL pipelines, doubling accessible data volume and cutting project setup time from months to weeks for 5+ research teams.
- Designed a high-throughput text extraction pipeline to parse 15GB+ of clinical notes, utilizing complex regular expressions to mine key clinical attributes and generate precision oncology patient cohorts.

---

## Featured Projects

### [RAG LLM System for Scientific Literature](https://github.com/reigningforest/rag_article_search)
- Developed an agentic RAG system using Langgraph over 800,000+ arXiv abstracts, featuring a query classification step to dynamically route requests and semantic search with Pinecone to optimize retrieval precision.
- Fine-tuned a 1.8B parameter LLM with LoRA on a custom dataset of scientific text to create a novel abstract simplification feature to improve research accessibility for end-users.
- **Tech:** LangGraph, Pinecone, LoRA, Gemini API, HuggingFace, Streamlit

### [Cloud-Based Intrusion Detection System](/projects/cloud-intrusion.html)
- Provisioned a secure, cloud-native data architecture in AWS, utilizing S3 for date-partitioned storage, Glue Crawlers for schema automation, and Redshift Serverless within a VPC.
- Orchestrated a scalable ETL pipeline using AWS Glue and PySpark to process and transform 2.5M+ network traffic records, delivering a structured dataset to power a real-time Random Forest intrusion detection model.
- **Tech:** AWS Glue, S3, Redshift, ECS Fargate, PySpark, Spark MLlib, Docker, FastAPI

### [Bank Customer Churn Prediction](https://github.com/reigningforest)
- Benchmarked 5 ML models (Random Forest, XGBoost, LightGBM, Neural Network, Logistic Regression) on 165K customer records, achieving 86%+ accuracy through systematic hyperparameter tuning and 5-fold cross-validation.
- Strategically tuned the LightGBM model's decision threshold to prioritize customer retention, boosting the identification of at-risk customers from 55% to 75% recall.
- **Tech:** PyTorch, scikit-learn, XGBoost, LightGBM

### [AI-Powered Soccer Analytics](https://github.com/reigningforest/mlds_hackathon_2024_soccer)
- Led 3-person team to deliver 3 analytics tools (lineup predictor, synergy finder, tactical chatbot) in a 48-hour MLDS Hackathon.
- **Tech:** scikit-learn, Random Forest, Collaborative Filtering, ChatGPT

### [YFinance Data Pipeline](https://github.com/reigningforest/yfinance_pipeline)
- Automated data pipeline for fetching and processing financial data: Fivetran (extract), Snowflake (load), dbt (transform), Streamlit (visualize).
- **Tech:** Fivetran, Snowflake, dbt, Streamlit, Plotly

---

## Technical Skills

**Languages & Frameworks:**  
Python (PyTorch, TensorFlow, PySpark, Scikit-learn, SciPy, statsmodels, LangGraph, LangChain, MCP, Websockets, Ollama, OpenAI, SQLAlchemy, OpenCV), R, SQL

**Cloud & Data Engineering:**  
AWS (S3, Glue, Lambda, Redshift, IAM), Hadoop, Spark, Snowflake, dbt, Fivetran, Airflow

**AI / ML & LLMs:**  
LangGraph, LangChain, Model Context Protocol (MCP), LoRA fine-tuning, RAG systems, Pinecone, HuggingFace

**DevOps & Deployment:**  
Docker, FastAPI, Streamlit, ECS Fargate, Railway

**Analytics & Visualization:**  
Tableau, Git, Jupyter

