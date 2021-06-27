<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      href="https://fonts.googleapis.com/css?family=Dosis:300,400,700"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="assets2/style.css" />
    <style>
      @font-face {
            font-family: museo-sans-rounded, sans-serif;
            font-weight: 400;
            font-style: normal;
            src: url("https://use.typekit.net/ljb6ftw.css");
      }
    </style>
    
    <title>Thrivy</title>

    <div class="home">
      <div class="top">
        <div class="flex-row">
          <img class="thrivy-logoyelo" src="assets2/images/thrivy logo_yelo.png"/>             
          <div class="thrivy museosansrounded900-regular-normal-white-18px">
            <b>THRIVY</b>
          </div>
        </div>
      </div>

      <nav class="navbar">
        <!-- Creating the hamburger menu -->
        <div class="hamburger-menu">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
        </div>

       <!-- Creating the navigation options -->
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link">About</a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">Shop</a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">Contact</a>
          </li>
        </ul>
      </nav>
      <script src="assets2/script.js"></script>
  </head>

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Adding font: Awesome CDN -->
    <script
      src="https://kit.fontawesome.com/64d58efce2.js"
      crossorigin="anonymous"
    ></script>
    
    <link rel="stylesheet" href="assets2/loginstyle.css" />
    <title>Sign in & Sign up Form</title>
  </head>
  
  <body>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">

          <!-- Creating the Login Form -->
          <form action="#" class="sign-in-form">
            <h2 class="title">SIGN IN</h2>
            
            <!-- Username input field & icon -->
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            
            <!-- Password input field & icon -->
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            
            <!-- Login button -->
            <input type="submit" value="Login" class="btn solid" />
            

            <!-- Giving options to login with social media platforms -->
            <!-- Creating the social icons -->
            <p class="social-text">Or Sign in with social platforms</p>

            <div class="social-media">
              <!-- Facebook -->
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
            
              <!-- Twitter -->
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>

              <!-- Gmail -->
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>

              <!-- Linkedin -->
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <!-- Creating the Login Form -->
          <form action="#" class="sign-up-form">
            <h2 class="title">SIGN UP</h2>
            

            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            

            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            

            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            

            <input type="submit" value="Register" class="btn solid" />
            

            <p class="social-text">Or Sign up with social platforms</p>
            
            <div class="social-media">
              <!-- Facebook -->
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
            
              <!-- Twitter -->
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>

              <!-- Gmail -->
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>

              <!-- Linkedin -->
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <!-- Creating the panels to go from sign n to sign up page & vice versa -->
      <div class="panels-container">
        
        <!-- Login page -->
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button class="btn transparent" id="sign-up-btn">SIGN UP</button>
          </div>
          <img src="assets2/images/login.svg" class="image" alt="" />
        </div>
        
        <!-- Sign up page -->
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button class="btn transparent" id="sign-in-btn">SIGN IN</button>
          </div>
          <img src="assets2/images/register.svg" class="image" alt="" />
        </div>
      
      </div>
    </div>

    <!-- Script to maneuver from login page to sign up page -->
    <script src="assets2/app.js"></script>
  </body>
</html>