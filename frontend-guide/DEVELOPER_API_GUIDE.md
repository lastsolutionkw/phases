# Developer API Guide - Mental Health Support Platform

## Overview

This guide provides comprehensive documentation for the Mental Health Support Platform API, including authentication, chat functionality, and all required endpoints. The API is built with Django REST Framework and uses JWT authentication with UUID-based security.

**Base URL**: `http://localhost:8000/api/v1/`  
**Authentication**: JWT (JSON Web Tokens)  
**Content-Type**: `application/json`

---

## Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [User Registration](#user-registration)
3. [User Login](#user-login)
4. [Starting a Chat Session](#starting-a-chat-session)
5. [Sending Messages](#sending-messages)
6. [Chat Management](#chat-management)
7. [Error Handling](#error-handling)
8. [Security Features](#security-features)

---

## Authentication Flow

The platform supports two modes:
- **Guest Mode**: Anonymous chat sessions without registration
- **Authenticated Mode**: Full features with user accounts and persistent chat history

### JWT Token Structure
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Token Lifetimes**:
- Access Token: 60 minutes
- Refresh Token: 7 days (with rotation)

---

## User Registration

Register a new user account with profile information.

### Endpoint
```
POST /api/v1/auth/register/
```

### Required Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "username": "string (required, unique)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 characters)",
  "password_confirm": "string (required, must match password)",
  "age": "integer (required, 13-120)",
  "gender": "string (required: 'male', 'female', 'prefer_not_to_say')",
  "country": "string (required)",
  "first_name": "string (optional)",
  "last_name": "string (optional)"
}
```

### cURL Example
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ahmed_salem",
    "email": "ahmed.salem@example.com",
    "password": "MySecurePass123!",
    "password_confirm": "MySecurePass123!",
    "age": 28,
    "gender": "male",
    "country": "Saudi Arabia",
    "first_name": "Ahmed",
    "last_name": "Salem"
  }'
```

### Success Response (201 Created)
```json
{
  "user": {
    "id": 15,
    "username": "ahmed_salem",
    "email": "ahmed.salem@example.com",
    "first_name": "Ahmed",
    "last_name": "Salem",
    "date_joined": "2024-08-03T10:30:00Z"
  },
  "secure_user_id": "a1b2c3d4-e5f6-7890-abcd-123456789012",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MTQ5NjYwMCwidXNlcl9pZCI6MTV9.abc123...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDEwMjAwLCJ1c2VyX2lkIjoxNX0.def456..."
}
```

### Error Response (400 Bad Request)
```json
{
  "username": ["A user with that username already exists."],
  "email": ["Enter a valid email address."],
  "password": ["This password is too short. It must contain at least 8 characters."]
}
```

---

## User Login

Authenticate with existing credentials to receive JWT tokens.

### Endpoint
```
POST /api/v1/auth/login/
```

### Required Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

### cURL Example
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ahmed_salem",
    "password": "MySecurePass123!"
  }'
```

### Success Response (200 OK)
```json
{
  "user": {
    "id": 15,
    "username": "ahmed_salem",
    "email": "ahmed.salem@example.com",
    "first_name": "Ahmed",
    "last_name": "Salem",
    "date_joined": "2024-08-03T10:30:00Z"
  },
  "secure_user_id": "a1b2c3d4-e5f6-7890-abcd-123456789012",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Error Response (400 Bad Request)
```json
{
  "non_field_errors": ["Unable to log in with provided credentials."]
}
```

---

## Starting a Chat Session

Create a new chat session for conversation. The platform supports both guest and authenticated sessions.

### Guest Chat Session

For users who want to chat without registering.

#### Endpoint
```
POST /api/v1/chat/guest/start/
```

#### Required Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "title": "string (optional, chat session title)"
}
```

#### cURL Example
```bash
curl -X POST "http://localhost:8000/api/v1/chat/guest/start/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Anonymous Support Session"
  }'
```

#### Success Response (201 Created)
```json
{
  "session_id": "b2c3d4e5-f6g7-8901-bcde-234567890123",
  "title": "Anonymous Support Session",
  "is_authenticated": false,
  "created_at": "2024-08-03T11:15:00Z",
  "message": "Guest chat session created successfully"
}
```

### Authenticated Chat Session

For logged-in users with full features and persistent history.

#### Endpoint
```
POST /api/v1/chat/auth/start/
```

#### Required Headers
```
Content-Type: application/json
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "title": "string (optional, chat session title)"
}
```

#### cURL Example
```bash
curl -X POST "http://localhost:8000/api/v1/chat/auth/start/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "My Mental Health Support Session"
  }'
```

#### Success Response (201 Created)
```json
{
  "session_id": "c3d4e5f6-g7h8-9012-cdef-345678901234",
  "title": "My Mental Health Support Session",
  "is_authenticated": true,
  "user_uuid": "a1b2c3d4-e5f6-7890-abcd-123456789012",
  "created_at": "2024-08-03T11:20:00Z",
  "message": "Authenticated chat session created successfully"
}
```

---

## Sending Messages

Send a message to an existing chat session and receive an AI response.

### Endpoint
```
POST /api/v1/chat/message/
```

### Required Headers
```
Content-Type: application/json
Authorization: Bearer <access_token> (optional for guest sessions)
```

### Request Body
```json
{
  "session_id": "string (required, UUID of chat session)",
  "message": "string (required, user message content)"
}
```

### cURL Example (Guest Session)
```bash
curl -X POST "http://localhost:8000/api/v1/chat/message/" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "b2c3d4e5-f6g7-8901-bcde-234567890123",
    "message": "أشعر بالقلق الشديد وأحتاج مساعدة في التعامل مع الضغوط"
  }'
```

### cURL Example (Authenticated Session)
```bash
curl -X POST "http://localhost:8000/api/v1/chat/message/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "session_id": "c3d4e5f6-g7h8-9012-cdef-345678901234",
    "message": "I have been feeling overwhelmed with work stress lately. Can you help me with some coping strategies?"
  }'
```

### Success Response (200 OK)
```json
{
  "user_message": {
    "id": 25,
    "content": "I have been feeling overwhelmed with work stress lately. Can you help me with some coping strategies?",
    "timestamp": "2024-08-03T11:25:00Z"
  },
  "ai_response": {
    "id": 26,
    "content": "أحس فيك والله… ضغط الشغل شيء طبيعي بس مهم نتعلم كيف نتعامل معه 💛. خلينا نبدأ بخطوات بسيطة تساعدك تخفف التوتر. أول شيء، ودك تحكي لي إيش أكثر جزء في الشغل مضايقك؟",
    "timestamp": "2024-08-03T11:25:03Z"
  }
}
```

### Error Responses

#### Session Not Found (404 Not Found)
```json
{
  "detail": "Chat session not found"
}
```

#### Permission Denied (403 Forbidden)
```json
{
  "detail": "You do not have permission to access this chat session"
}
```

#### Validation Error (400 Bad Request)
```json
{
  "message": ["This field is required."],
  "session_id": ["Must be a valid UUID."]
}
```

---

## Chat Management

### Get Chat History

Retrieve chat history for authenticated users.

#### Endpoint
```
GET /api/v1/chat/history/
```

#### Required Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
?page=1&page_size=20&session_id=<uuid> (optional filter by session)
```

#### cURL Example
```bash
curl -X GET "http://localhost:8000/api/v1/chat/history/?page=1&page_size=10" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

#### Success Response (200 OK)
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "session_id": "c3d4e5f6-g7h8-9012-cdef-345678901234",
      "title": "My Mental Health Support Session",
      "created_at": "2024-08-03T11:20:00Z",
      "updated_at": "2024-08-03T11:25:03Z",
      "message_count": 4,
      "is_active": true
    }
  ]
}
```

### Get Session Details

Retrieve specific session with messages.

#### Endpoint
```
GET /api/v1/chat/session/<session_id>/
```

#### Required Headers
```
Authorization: Bearer <access_token> (required for authenticated sessions)
```

#### cURL Example
```bash
curl -X GET "http://localhost:8000/api/v1/chat/session/c3d4e5f6-g7h8-9012-cdef-345678901234/" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

#### Success Response (200 OK)
```json
{
  "session_id": "c3d4e5f6-g7h8-9012-cdef-345678901234",
  "title": "My Mental Health Support Session",
  "is_authenticated": true,
  "created_at": "2024-08-03T11:20:00Z",
  "updated_at": "2024-08-03T11:25:03Z",
  "messages": [
    {
      "id": 25,
      "role": "user",
      "content": "I have been feeling overwhelmed with work stress lately. Can you help me with some coping strategies?",
      "timestamp": "2024-08-03T11:25:00Z"
    },
    {
      "id": 26,
      "role": "assistant",
      "content": "أحس فيك والله… ضغط الشغل شيء طبيعي بس مهم نتعلم كيف نتعامل معه 💛...",
      "timestamp": "2024-08-03T11:25:03Z"
    }
  ]
}
```

### Delete Session

Delete a specific chat session.

#### Endpoint
```
DELETE /api/v1/chat/session/<session_id>/
```

#### Required Headers
```
Authorization: Bearer <access_token>
```

#### cURL Example
```bash
curl -X DELETE "http://localhost:8000/api/v1/chat/session/c3d4e5f6-g7h8-9012-cdef-345678901234/" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

#### Success Response (204 No Content)
```
No response body
```

---

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages.

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful, no content returned
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Error Response Format
```json
{
  "detail": "Error message description",
  "field_name": ["Field-specific error messages"]
}
```

### Common Error Scenarios

#### Invalid JWT Token (401 Unauthorized)
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

#### Rate Limit Exceeded (429 Too Many Requests)
```json
{
  "detail": "Request was throttled. Expected available in 60 seconds."
}
```

#### Validation Error (400 Bad Request)
```json
{
  "username": ["This field is required."],
  "email": ["Enter a valid email address."],
  "age": ["Ensure this value is greater than or equal to 13."]
}
```

---

## Security Features

### UUID-Based Security
All resources use UUIDs instead of sequential IDs to prevent enumeration attacks:
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-123456789012",
  "secure_user_id": "b2c3d4e5-f6g7-8901-bcde-234567890123"
}
```

### Rate Limiting
- **Anonymous users**: 100 requests/hour
- **Authenticated users**: 1000 requests/hour

### CORS Configuration
The API is configured for cross-origin requests from:
- `http://localhost:3000` (Development)
- `https://phases.tarq.me` (Production)

### Data Validation
- All inputs are validated for type, format, and constraints
- XSS protection through Django's built-in escaping
- SQL injection protection through ORM usage

---

## AI Integration

### Supported Languages
- **Arabic**: Primary language for Saudi users
- **English**: Secondary language support

### AI Models
- **Primary**: `command-r7b-arabic:latest` for Arabic conversations
- **Fallback**: `llama3.2:latest` for general conversations
- **Summarization**: `llama3.2:1b` for memory processing

### Memory System
The platform includes advanced memory management:
- **Short-term memory**: Conversation summaries within sessions
- **Long-term memory**: User profile and preference learning
- **Context injection**: Personalized responses based on user history

---

## Complete Integration Example

Here's a complete example showing the full flow from registration to conversation:

```bash
#!/bin/bash

BASE_URL="http://localhost:8000/api/v1"

# 1. Register new user
echo "=== Registering User ==="
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_developer",
    "email": "developer@example.com",
    "password": "DevPass123!",
    "password_confirm": "DevPass123!",
    "age": 30,
    "gender": "prefer_not_to_say",
    "country": "Saudi Arabia"
  }')

echo "$REGISTER_RESPONSE" | jq .

# Extract access token
ACCESS_TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.access')

# 2. Start authenticated chat session
echo -e "\n=== Starting Chat Session ==="
SESSION_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/auth/start/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "title": "Developer Test Session"
  }')

echo "$SESSION_RESPONSE" | jq .

# Extract session ID
SESSION_ID=$(echo "$SESSION_RESPONSE" | jq -r '.session_id')

# 3. Send message to chat
echo -e "\n=== Sending Message ==="
MESSAGE_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/message/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{
    \"session_id\": \"$SESSION_ID\",
    \"message\": \"Hello, I'm testing the API integration. Can you help me understand how this works?\"
  }")

echo "$MESSAGE_RESPONSE" | jq .

# 4. Get chat history
echo -e "\n=== Getting Chat History ==="
HISTORY_RESPONSE=$(curl -s -X GET "$BASE_URL/chat/history/" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$HISTORY_RESPONSE" | jq .

echo -e "\n=== Integration Test Complete ==="
```

---

## Support and Documentation

### Health Check
Monitor API status:
```bash
curl -X GET "http://localhost:8000/api/v1/health/"
```

### Additional Resources
- OpenAPI documentation available at `/api/v1/docs/` (if configured)
- Postman collection can be generated from the API endpoints
- WebSocket support for real-time messaging (if implemented)

### Contact
For technical support or API questions, please refer to the project documentation or contact the development team.

---

*This guide covers the core functionality required for user registration, authentication, and chat interactions. The platform includes additional features like mood tracking, goal setting, and resource management that follow similar patterns.*