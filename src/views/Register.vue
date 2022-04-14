<template>
  <div class="container">
    <div class="icon-image">
      <SvgImage nameImage="welcome-home" width="100px" height="auto" />
      <p id="letter-icon">SHEMS</p>
    </div>
    <h2>Register</h2>
    <div id="username" class="input-text">
      <p>User</p>
      <input type="text" v-model="email" />
    </div>
    <div id="password" class="input-text">
      <p>Password</p>
      <input type="password" v-model="password" />
    </div>
    <div id="confirmpassword" class="input-text">
      <p>Confirm Password</p>
      <input type="password" v-model="confirmPassword" />
    </div>
    <div id="confirmpassword" class="input-text">
      <input value="Register" type="submit" />
    </div>
  </div>
</template>

<script>
import SvgImage from "../components/FileSvg.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  components: {
    SvgImage,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  text-align: center;
  .icon-image {
    text-align: center;

    #letter-icon {
      font-size: 1.4em;
      font-weight: bold;
      letter-spacing: 5px;
      color: #5eaffb;
    }
  }
  h2 {
    padding: 1em 0em;
  }
  .input-text {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    p {
      align-self: start;
      font-weight: bold;
    }
    input[type="text"],
    input[type="password"] {
      padding: 0.5em 0.5em;
      font-size: clamp(0.8em, 2vw, 4em);
    }
    input[type="submit"] {
      width: 30vw;
      margin: 0 auto;
      font-size: clamp(0.8em, 2vw, 6em);
      padding: 0.5em;
      border: 2px solid black;
      border-radius: 7px;
      font-weight: bold;
      background-color: #94cafe;
    }
  }
}
</style>
