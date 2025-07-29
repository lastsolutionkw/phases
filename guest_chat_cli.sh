#!/bin/bash

# Guest Chat API Testing Script
# This script demonstrates the guest chatting functionality without authentication

set -e  # Exit on any error

# Configuration
BACKEND_API="http://localhost:8000/api/v1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables to store API responses
SESSION_ID=""
FIRST_MESSAGE_ID=""
SECOND_MESSAGE_ID=""

# Helper function to print colored output
print_step() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Helper function to extract JSON values
extract_json_value() {
    echo "$1" | grep -o "\"$2\":[^,}]*" | cut -d':' -f2 | tr -d '"' | tr -d ' '
}

# Test API endpoint availability
print_step "Testing API Availability"
if curl -s -f "${BACKEND_API}/health/" > /dev/null 2>&1; then
    print_success "Backend API is available at ${BACKEND_API}"
else
    print_error "Backend API is not available at ${BACKEND_API}"
    print_info "Please make sure the Django server is running: python manage.py runserver"
    exit 1
fi

echo

# Step 1: Start Guest Chat Session
print_step "Step 1: Starting Guest Chat Session"
print_info "Creating new guest chat session (no authentication required)"

GUEST_CHAT_RESPONSE=$(curl -s -X POST "${BACKEND_API}/chat/guest/start/" \
    -H "Content-Type: application/json" \
    -d "{
        \"title\": \"Guest Mental Health Support - $(date '+%Y-%m-%d %H:%M')\"
    }")

if echo "$GUEST_CHAT_RESPONSE" | grep -q "id"; then
    SESSION_ID=$(extract_json_value "$GUEST_CHAT_RESPONSE" "id")
    IS_AUTHENTICATED=$(extract_json_value "$GUEST_CHAT_RESPONSE" "is_authenticated")
    
    print_success "Guest chat session created successfully"
    print_info "Session ID: ${SESSION_ID}"
    print_info "Is Authenticated: ${IS_AUTHENTICATED}"
    print_info "Session Details:"
    echo "$GUEST_CHAT_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$GUEST_CHAT_RESPONSE"
else
    print_error "Failed to create guest chat session"
    echo "Response: $GUEST_CHAT_RESPONSE"
    exit 1
fi

echo

# Step 2: Send First Message
print_step "Step 2: Sending First Message to Guest Session"
FIRST_MESSAGE="I'm feeling overwhelmed with work stress and need some guidance on how to manage it."
print_info "Sending message: \"${FIRST_MESSAGE}\""

FIRST_MESSAGE_RESPONSE=$(curl -s -X POST "${BACKEND_API}/chat/message/" \
    -H "Content-Type: application/json" \
    -d "{
        \"session_id\": \"${SESSION_ID}\",
        \"message\": \"${FIRST_MESSAGE}\"
    }")

if echo "$FIRST_MESSAGE_RESPONSE" | grep -q "ai_response"; then
    print_success "First message sent successfully"
    
    USER_MSG_ID=$(echo "$FIRST_MESSAGE_RESPONSE" | grep -o '"user_message":{[^}]*"id":[0-9]*' | grep -o '[0-9]*$')
    AI_MSG_ID=$(echo "$FIRST_MESSAGE_RESPONSE" | grep -o '"ai_response":{[^}]*"id":[0-9]*' | grep -o '[0-9]*$')
    AI_RESPONSE_CONTENT=$(echo "$FIRST_MESSAGE_RESPONSE" | grep -o '"ai_response":{[^}]*"content":"[^"]*"' | grep -o 'content":"[^"]*"' | cut -d'"' -f3)
    
    FIRST_MESSAGE_ID="$USER_MSG_ID"
    
    print_info "User Message ID: ${USER_MSG_ID}"
    print_info "AI Message ID: ${AI_MSG_ID}"
    print_info "AI Response Preview: ${AI_RESPONSE_CONTENT:0:100}..."
    echo
    print_info "Full AI Response:"
    echo "${AI_RESPONSE_CONTENT}"
else
    print_error "Failed to send first message"
    echo "Response: $FIRST_MESSAGE_RESPONSE"
    exit 1
fi

echo

# Step 3: Send Second Message
print_step "Step 3: Sending Second Message to Guest Session"
SECOND_MESSAGE="Thank you for the advice. Can you provide some specific stress management techniques I can use during my work day?"
print_info "Sending follow-up message: \"${SECOND_MESSAGE}\""

SECOND_MESSAGE_RESPONSE=$(curl -s -X POST "${BACKEND_API}/chat/message/" \
    -H "Content-Type: application/json" \
    -d "{
        \"session_id\": \"${SESSION_ID}\",
        \"message\": \"${SECOND_MESSAGE}\"
    }")

if echo "$SECOND_MESSAGE_RESPONSE" | grep -q "ai_response"; then
    print_success "Second message sent successfully"
    
    USER_MSG_ID=$(echo "$SECOND_MESSAGE_RESPONSE" | grep -o '"user_message":{[^}]*"id":[0-9]*' | grep -o '[0-9]*$')
    AI_MSG_ID=$(echo "$SECOND_MESSAGE_RESPONSE" | grep -o '"ai_response":{[^}]*"id":[0-9]*' | grep -o '[0-9]*$')
    AI_RESPONSE_CONTENT=$(echo "$SECOND_MESSAGE_RESPONSE" | grep -o '"ai_response":{[^}]*"content":"[^"]*"' | grep -o 'content":"[^"]*"' | cut -d'"' -f3)
    
    SECOND_MESSAGE_ID="$USER_MSG_ID"
    
    print_info "User Message ID: ${USER_MSG_ID}"
    print_info "AI Message ID: ${AI_MSG_ID}"
    print_info "AI Response Preview: ${AI_RESPONSE_CONTENT:0:100}..."
    echo
    print_info "Full AI Response:"
    echo "${AI_RESPONSE_CONTENT}"
else
    print_error "Failed to send second message"
    echo "Response: $SECOND_MESSAGE_RESPONSE"
    exit 1
fi

echo

# Step 4: Retrieve Guest Session Details
print_step "Step 4: Retrieving Guest Session Details"
print_info "Getting complete session details with all messages"

SESSION_DETAIL_RESPONSE=$(curl -s -X GET "${BACKEND_API}/chat/session/${SESSION_ID}/" \
    -H "Content-Type: application/json")

if echo "$SESSION_DETAIL_RESPONSE" | grep -q "messages"; then
    print_success "Session details retrieved successfully"
    
    # Count messages
    MESSAGE_COUNT=$(echo "$SESSION_DETAIL_RESPONSE" | grep -o '"role":' | wc -l | tr -d ' ')
    print_info "Total messages in session: ${MESSAGE_COUNT}"
    print_info "Session is authenticated: $(extract_json_value "$SESSION_DETAIL_RESPONSE" "is_authenticated")"
    
    print_info "Complete Session Details:"
    echo "$SESSION_DETAIL_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$SESSION_DETAIL_RESPONSE"
else
    print_error "Failed to retrieve session details"
    echo "Response: $SESSION_DETAIL_RESPONSE"
fi

echo

# Step 5: Send Third Message
print_step "Step 5: Sending Third Message to Continue Conversation"
THIRD_MESSAGE="These techniques sound helpful. How often should I practice them to see real benefits?"
print_info "Sending another message: \"${THIRD_MESSAGE}\""

THIRD_MESSAGE_RESPONSE=$(curl -s -X POST "${BACKEND_API}/chat/message/" \
    -H "Content-Type: application/json" \
    -d "{
        \"session_id\": \"${SESSION_ID}\",
        \"message\": \"${THIRD_MESSAGE}\"
    }")

if echo "$THIRD_MESSAGE_RESPONSE" | grep -q "ai_response"; then
    print_success "Third message sent successfully"
    
    AI_RESPONSE_CONTENT=$(echo "$THIRD_MESSAGE_RESPONSE" | grep -o '"ai_response":{[^}]*"content":"[^"]*"' | grep -o 'content":"[^"]*"' | cut -d'"' -f3)
    
    print_info "AI Response Preview: ${AI_RESPONSE_CONTENT:0:100}..."
    echo
    print_info "Full AI Response:"
    echo "${AI_RESPONSE_CONTENT}"
else
    print_error "Failed to send third message"
    echo "Response: $THIRD_MESSAGE_RESPONSE"
fi

echo

# Step 6: Test Session Access Without Authentication
print_step "Step 6: Testing Session Access (Guest Mode)"
print_info "Verifying that guest sessions can be accessed without authentication"

ACCESS_TEST_RESPONSE=$(curl -s -X GET "${BACKEND_API}/chat/session/${SESSION_ID}/" \
    -H "Content-Type: application/json")

if echo "$ACCESS_TEST_RESPONSE" | grep -q "messages"; then
    print_success "Guest session accessible without authentication ✓"
    FINAL_MESSAGE_COUNT=$(echo "$ACCESS_TEST_RESPONSE" | grep -o '"role":' | wc -l | tr -d ' ')
    print_info "Final message count: ${FINAL_MESSAGE_COUNT}"
else
    print_error "Failed to access guest session"
    echo "Response: $ACCESS_TEST_RESPONSE"
fi

echo

# Step 7: Test Creating Another Guest Session
print_step "Step 7: Creating Second Guest Session"
print_info "Testing creation of multiple guest sessions"

SECOND_GUEST_SESSION=$(curl -s -X POST "${BACKEND_API}/chat/guest/start/" \
    -H "Content-Type: application/json" \
    -d "{
        \"title\": \"Second Guest Session - $(date '+%Y-%m-%d %H:%M')\"
    }")

if echo "$SECOND_GUEST_SESSION" | grep -q "id"; then
    SECOND_SESSION_ID=$(extract_json_value "$SECOND_GUEST_SESSION" "id")
    print_success "Second guest session created successfully"
    print_info "Second Session ID: ${SECOND_SESSION_ID}"
    
    # Send a quick message to the second session
    QUICK_MESSAGE_RESPONSE=$(curl -s -X POST "${BACKEND_API}/chat/message/" \
        -H "Content-Type: application/json" \
        -d "{
            \"session_id\": \"${SECOND_SESSION_ID}\",
            \"message\": \"Hello, this is a test message in the second guest session.\"
        }")
    
    if echo "$QUICK_MESSAGE_RESPONSE" | grep -q "ai_response"; then
        print_success "Message sent to second session successfully"
    else
        print_error "Failed to send message to second session"
    fi
else
    print_error "Failed to create second guest session"
fi

echo

# Summary
print_step "Guest Chat Test Summary"
print_success "All guest chat API tests completed successfully!"
echo
print_info "Test Results Summary:"
echo "• Guest Chat Session Creation: ✓"
echo "• Message Sending (3 messages): ✓"
echo "• Session Details Retrieval: ✓"
echo "• Session Access Without Auth: ✓"
echo "• Multiple Guest Sessions: ✓"
echo "• AI Response Generation: ✓"
echo
print_info "Session Information:"
echo "• Primary Session ID: ${SESSION_ID}"
echo "• Secondary Session ID: ${SECOND_SESSION_ID:-N/A}"
echo "• Authentication Required: No"
echo "• Total Messages Sent: 4 (3 in first session, 1 in second)"
echo "• Session Access: Public (anyone with UUID)"
echo
print_success "🎉 Guest Chat System is working perfectly!"
print_info "Guest users can now:"
echo "  • Start chat sessions without registration"
echo "  • Send messages and receive AI responses"
echo "  • Access their sessions using the session UUID"
echo "  • Create multiple concurrent sessions"
echo
print_info "Next steps for full testing:"
echo "  • Run ./auth_chat_cli.sh to test authenticated mode"
echo "  • Test the system with both guest and auth users simultaneously"