1. Tổng quan
API cung cấp các endpoint cho phép tích hợp các tính năng AI và Web3 vào hệ thống. Các tính năng bao gồm:
- Quản lý người dùng với xác thực blockchain.
- Xử lý học tập cá nhân hóa sử dụng AI.
- Giao dịch token hóa trên blockchain.
- Phân tích dữ liệu học tập và gợi ý.
2. Authentication
Tất cả các API yêu cầu xác thực thông qua JWT (JSON Web Token) hoặc chữ ký số từ ví blockchain (Ethereum, Solana, hoặc Polygon).

2.1 Đăng nhập với Wallet
Endpoint: POST /api/auth/wallet-login
Request:

json
Sao chép
Chỉnh sửa
{
  "wallet_address": "0x1234567890abcdef",
  "signature": "signature_string_from_wallet"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "token": "jwt_token_here",
  "user_id": "unique_user_id"
}
3. User Management
3.1 Lấy thông tin người dùng
Endpoint: GET /api/user/profile
Headers:

json
Sao chép
Chỉnh sửa
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "user_id": "unique_user_id",
  "wallet_address": "0x1234567890abcdef",
  "level": "Intermediate",
  "token_balance": 1200
}
3.2 Cập nhật thông tin người dùng
Endpoint: PUT /api/user/profile
Request:

json
Sao chép
Chỉnh sửa
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "status": "success",
  "message": "User profile updated successfully."
}
4. AI Features
4.1 Gợi ý khóa học cá nhân hóa
Endpoint: POST /api/ai/course-recommendations
Request:

json
Sao chép
Chỉnh sửa
{
  "user_id": "unique_user_id",
  "preferences": ["blockchain", "AI"],
  "learning_history": ["CourseID_001", "CourseID_002"]
}
Response:

json
Sao chép
Chỉnh sửa
{
  "recommendations": [
    { "course_id": "CourseID_003", "title": "Advanced Blockchain Development" },
    { "course_id": "CourseID_004", "title": "AI-Powered Solutions in Web3" }
  ]
}
4.2 Phân tích tiến độ học tập
Endpoint: POST /api/ai/progress-analysis
Request:

json
Sao chép
Chỉnh sửa
{
  "user_id": "unique_user_id",
  "progress_data": [
    { "course_id": "CourseID_001", "completion": 75 },
    { "course_id": "CourseID_002", "completion": 50 }
  ]
}
Response:

json
Sao chép
Chỉnh sửa
{
  "analysis": "User has completed 62.5% of their courses.",
  "suggestions": ["Focus on CourseID_002 to improve overall completion rate."]
}
5. Web3 Features
5.1 Gửi token
Endpoint: POST /api/web3/send-token
Request:

json
Sao chép
Chỉnh sửa
{
  "from_wallet": "0x1234567890abcdef",
  "to_wallet": "0xabcdef1234567890",
  "amount": 100,
  "token_type": "EDU"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "status": "success",
  "transaction_id": "0xtransactionhash"
}
5.2 Lấy lịch sử giao dịch
Endpoint: GET /api/web3/transactions
Headers:

json
Sao chép
Chỉnh sửa
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "transactions": [
    {
      "transaction_id": "0xtransactionhash",
      "from": "0x1234567890abcdef",
      "to": "0xabcdef1234567890",
      "amount": 100,
      "token_type": "EDU",
      "timestamp": "2025-01-22T10:00:00Z"
    }
  ]
}
6. Tokenized Reward System
6.1 Kiểm tra phần thưởng
Endpoint: GET /api/rewards/check
Headers:

json
Sao chép
Chỉnh sửa
{
  "Authorization": "Bearer jwt_token_here"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "reward_balance": 50,
  "next_reward": {
    "type": "Bonus Token",
    "amount": 10,
    "condition": "Complete CourseID_003"
  }
}
6.2 Đổi phần thưởng
Endpoint: POST /api/rewards/redeem
Request:

json
Sao chép
Chỉnh sửa
{
  "reward_id": "RewardID_001",
  "user_id": "unique_user_id"
}
Response:

json
Sao chép
Chỉnh sửa
{
  "status": "success",
  "message": "Reward redeemed successfully.",
  "transaction_id": "0xrewardtransactionhash"
}
7. Webhook
Hỗ trợ webhook để thông báo sự kiện:
Token giao dịch thành công.
Người dùng đạt phần thưởng.
Hoàn thành khóa học.
8. Lỗi phổ biến
401 Unauthorized: Token không hợp lệ hoặc đã hết hạn.
404 Not Found: Dữ liệu không tồn tại.
500 Internal Server Error: Lỗi hệ thống.
