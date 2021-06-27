<!DOCTYPE html>
<html lang="en">
    <head>
    <?php include 'header.php';?>
    </head>
    
    <body>
        <div class="login">
            <div class="login__content">
                <div class="login__img">
                    <img src="assets2/images/login-register.svg" alt="">
                </div>

                <div class="login__forms">

                    <form action="" class="login__create none" id="login-up">
                        <h1 class="login__title">Create Account</h1>
    
                        <div class="login__box">
                            <i class='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" class="login__input">
                        </div>
    
                        <div class="login__box">
                            <i class='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" class="login__input">
                        </div>

                        <div class="login__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" class="login__input">
                        </div>

                        <a href="#" class="login__button">Sign Up</a>

                        <div>
                            <span class="login__account">Already have an Account ?</span>
                            <a href="login.html" class="login__signup" id="sign-in">Sign In</span>
                        </div>

                        <div class="login__social">
                            <a href="#" class="login__social-icon"><i class='bx bxl-facebook' ></i></a>
                            <a href="#" class="login__social-icon"><i class='bx bxl-twitter' ></i></a>
                            <a href="#" class="login__social-icon"><i class='bx bxl-google' ></i></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--===== MAIN JS =====
        <script src="login.js"></script>-->
    </body>
</html>
