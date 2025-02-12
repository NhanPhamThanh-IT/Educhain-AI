from app.services.chatbot_service import get_answer_stream

if __name__ == "__main__":
    import asyncio
    
    async def test():
        # answer = get_answer_stream("hi", "test-session")
        # print(answer)
        async for event in get_answer_stream("hi", "test-session"):
            print('event:', event)
        print('done')

    
    asyncio.run(test())