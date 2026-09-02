<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BMA | Secure Login</title>
  <!-- Bootstrap 5.3 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome 6 -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <!-- Google Font Inter -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F4F7FE;
      color: #111827;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      background: #ffffff;
      border: none;
      border-radius: 18px;
      box-shadow: 0 10px 30px rgba(79, 70, 229, 0.08);
      max-width: 480px;
      width: 100%;
      padding: 2.5rem;
    }
    .brand-logo {
      font-size: 2rem;
      font-weight: 800;
      color: #4F46E5;
      letter-spacing: -1px;
    }
    .brand-logo span {
      color: #10B981;
    }
    .btn-primary {
      background-color: #4F46E5;
      border-color: #4F46E5;
      font-weight: 500;
      padding: 0.75rem;
      border-radius: 10px;
    }
    .btn-primary:hover {
      background-color: #4338CA;
      border-color: #4338CA;
    }
    .nav-tabs {
      border-bottom: 2px solid #E5E7EB;
    }
    .nav-tabs .nav-link {
      border: none;
      color: #6B7280;
      font-weight: 500;
      padding: 0.75rem 1rem;
    }
    .nav-tabs .nav-link.active {
      color: #4F46E5;
      border-bottom: 2px solid #4F46E5;
      background: transparent;
    }
    .form-control {
      border-radius: 10px;
      padding: 0.75rem;
      border: 1px solid #D1D5DB;
    }
    .form-control:focus {
      border-color: #4F46E5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }
  </style>
</head>
<body>

  <div class="login-card">
    <div class="text-center mb-4">
      <h1 class="brand-logo"><i class="fa-solid fa-wallet me-2"></i>BMA<span>.</span></h1>
      <h5 class="fw-bold mt-2">Welcome Back</h5>
      <p class="text-muted small">Secure Digital Payment Platform</p>
    </div>

    <% if (error) { %>
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="fa-solid fa-triangle-exclamation me-2"></i>
        <div><%= error %></div>
      </div>
    <% } %>

    <% if (message) { %>
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <i class="fa-solid fa-circle-check me-2"></i>
        <div><%= message %></div>
      </div>
    <% } %>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-4 justify-content-center" id="authTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab">Sign In</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab">Register</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" id="forgot-tab" data-bs-toggle="tab" data-bs-target="#forgot" type="button" role="tab">Reset PW</button>
      </li>
    </ul>

    <div class="tab-content" id="authTabsContent">
      <!-- Login Form -->
      <div class="tab-pane fade show active" id="login" role="tabpanel">
        <form action="/login" method="POST">
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Email or Phone</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-muted border-end-0"><i class="fa-solid fa-envelope"></i></span>
              <input type="text" name="identity" class="form-control border-start-0" placeholder="name@domain.com / +880..." required>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label small fw-semibold">Password</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-muted border-end-0"><i class="fa-solid fa-lock"></i></span>
              <input type="password" name="password" class="form-control border-start-0" placeholder="••••••••" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100 py-2 fs-6">Sign In</button>
        </form>
      </div>

      <!-- Register Form -->
      <div class="tab-pane fade" id="register" role="tabpanel">
        <form action="/register" method="POST">
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Account Role</label>
            <select class="form-select form-control" name="role" id="registerRole" onchange="toggleMerchantFields()" required>
              <option value="user">Individual User</option>
              <option value="merchant">Merchant Business</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-semibold">Full Name / Owner Name</label>
            <input type="text" name="full_name" class="form-control" placeholder="John Doe" required>
          </div>

          <div id="merchantFields" class="d-none">
            <div class="mb-3">
              <label class="form-label small fw-semibold">Business Name</label>
              <input type="text" name="business_name" class="form-control" placeholder="XYZ Enterprise">
            </div>
            <div class="mb-3">
              <label class="form-label small fw-semibold">Business Address</label>
              <input type="text" name="business_address" class="form-control" placeholder="123 Commercial St, Dhaka">
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-semibold">Email Address</label>
            <input type="email" name="email" class="form-control" placeholder="name@domain.com" required>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-semibold">Phone Number</label>
            <input type="text" name="phone" class="form-control" placeholder="+8801700000000" required>
          </div>

          <div class="mb-4">
            <label class="form-label small fw-semibold">Password</label>
            <input type="password" name="password" class="form-control" placeholder="Minimum 6 characters" required>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fs-6">Register Account</button>
        </form>
      </div>

      <!-- Forgot Password Form -->
      <div class="tab-pane fade" id="forgot" role="tabpanel">
        <p class="text-muted small text-center mb-4">Enter your registered email below and we'll process a password reset verification link securely.</p>
        <form action="/forgot-password" method="POST">
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          <div class="mb-4">
            <label class="form-label small fw-semibold">Email Address</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-muted border-end-0"><i class="fa-solid fa-envelope"></i></span>
              <input type="email" name="email" class="form-control border-start-0" placeholder="name@domain.com" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100 py-2 fs-6">Request Reset Link</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    function toggleMerchantFields() {
      const role = document.getElementById('registerRole').value;
      const merchantFields = document.getElementById('merchantFields');
      if (role === 'merchant') {
        merchantFields.classList.remove('d-none');
        merchantFields.querySelectorAll('input').forEach(i => i.setAttribute('required', 'true'));
      } else {
        merchantFields.classList.add('d-none');
        merchantFields.querySelectorAll('input').forEach(i => i.removeAttribute('required'));
      }
    }
  </script>
</body>
</html>
