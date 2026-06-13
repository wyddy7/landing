# Daniil Makeev — AI Engineer

> AI Engineer. Builds production AI agents, RAG pipelines and content-generation systems — end to end.

- **Canonical:** https://wyddy.tech/
- **Role:** AI Engineer
- **Tagline:** I build and ship AI agents and RAG systems end to end.
- **Availability:** Open to full-time or contract · remote / relocation

## About

I'm an AI engineer based in Moscow, open to remote or relocation across EU/US
timezones. I started in Python backend in 2023 — ETL, data pipelines, internal
services — and moved into applied AI in January 2025.

For the past year-plus I've been an AI engineer at [Hao](https://hao.vc),
shipping production RAG and content-generation pipelines, where I led a video
pipeline to **6× faster output at 60% lower cost**. On the side I build and ship
my own tools — an open-source [browser agent](https://wyddy.tech/case-browd.html),
a multi-tenant contact RAG, a personalized news digest. Graduating Bauman MSTU
(CS) in 2026.

## Experience

### AI Engineer · Hao (2025 — Present)

Led the video-generation pipeline end to end — dialogue generation, TTS, image
compose, cost instrumentation — and shipped supporting RAG work and the marketing
site. Rebuilt a linear orchestrator into a two-stage CLI with a JSON contract,
parallel TTS + pluggable image generation, FFmpeg compose with karaoke subtitles,
and per-generation cost tracking.

- **Results:** 6× faster output · −60% generation cost · batch mode for continuous runs
- **Stack:** Python · LLM pipelines · RAG · ElevenLabs TTS · FFmpeg · S3
- Case study: https://wyddy.tech/case-video-pipeline.html

### Python Developer · Zenit-Elektro (2023 — 2025)

Metrology company · internal tooling. Owned Python services across ETL and data
quality for internal catalogs. Automated manual moderation across product
catalogs and added validation across data imports from partner systems.

- **Results:** 3× faster site moderation · −60% import errors
- **Stack:** Python · FastAPI · AsyncIO · PostgreSQL · ETL

## Projects

### Browd — browser-resident AI agent

A Chrome side-panel agent that runs multi-step tasks inside your real browser
session — no headless cloud, no credential copy-paste. LangGraph.js
plan-and-execute with per-tool state budgets, tab isolation, prompt-injection
guards on every third-party text source.

- **Status:** Live on the Chrome Web Store · open-source, Apache-2.0
- **Stack:** TypeScript · LangGraph.js · MV3 service worker · puppeteer-core · React
- Install: https://chromewebstore.google.com/detail/browd-ai-browser-agent/kgjeibjpgopjomghegdpelbnjgmddobb
- Source: https://github.com/wyddy7/browd
- Case study: https://wyddy.tech/case-browd.html

### NetWho — multi-tenant contact RAG

An AI assistant for personal and organizational networks. Multi-tenant with
per-tenant RLS isolation, semantic search over embeddings, news parsing, and a
reranking loop that grounds answers in source records.

- **Status:** Live on Telegram — you can message it yourself
- **Stack:** RAG · pgvector · reranking · aiogram · Supabase
- Try: https://t.me/netwho_bot
- Source: https://github.com/wyddy7/netwho
- Case study: https://wyddy.tech/case-netwho.html

### Digest Bot — personalized news digest

Reads your channels — fetching the article behind link-only posts — and writes
one summary tuned to your focus. A deterministic pipeline produces the daily
digest; a separate stateful chat agent (LangGraph, checkpointed to Supabase)
answers follow-ups.

- **Status:** Self-hosted · running daily
- **Stack:** LangGraph · Supabase checkpointer · OpenRouter · python-telegram-bot · Docker
- Source: https://github.com/wyddy7/claude-digest
- Case study: https://wyddy.tech/case-digest.html

## Skills

- **AI / ML:** RAG · Vector search · Reranking · Grounded generation · Structured outputs · LLM deduplication
- **Frameworks:** FastAPI · LangGraph · PydanticAI · aiogram · python-telegram-bot · deepagents
- **Data:** PostgreSQL · Supabase · pgvector · Pydantic v2 · AsyncIO · httpx
- **Platforms:** OpenRouter · OpenAI · ElevenLabs · Jina AI · Backblaze S3
- **DevOps:** Docker · docker-compose · GitHub Actions · uv · Linux
- **Languages:** Python · SQL · TypeScript · English B2 · Russian native · Chinese B1

## Contact

The projects here I built, shipped, and keep running myself. If that's the kind
of engineer your team is missing:

- Telegram (primary): https://t.me/wyddy7
- Email: wyddy7@gmail.com
- GitHub: https://github.com/wyddy7
- LinkedIn: https://www.linkedin.com/in/wyddy
- X: https://x.com/wyddy7
