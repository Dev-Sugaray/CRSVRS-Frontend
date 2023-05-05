<script setup>
import CuiButton from '@/components/CuiButton';
import CuiInput from '@/components/CuiInput';

// Pinia dependencies
// import { storeToRefs } from 'pinia';
// Pinia stores
import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();
const { loginAdmin } = authStore;

</script>

<template>
	<div class="d-flex align-items-center overflow-hidden">
		<div class="col-lg-6 lg col-md-6 col-sm-12 col-xs-12 d-flex align-items-center img-wrap">
			<div class="img-container">
				<div class="d-flex align-items-center justify-content-center">
					<h1 class="text-center h2">Cross River State Vehicle Security Number Registration System</h1>
				</div>
			</div>
		</div>
		<div class="col-lg-6 col-md-6 w-sm-100 col-sm-12 col-xs-12 d-flex align-items-center justify-content-center">
			<div class="container-fluid form-container">
				<div>
					<div class="text-center">
						<img class="logo" src="../../assets/img/logo_with_bg.jpg" data-aos="slide-right">
					</div>
					<h1 class='p-2' data-aos="fade">Login to your dashboard</h1>
					<div class="container" data-aos="fade">
						<label>Phone number</label>
						<cui-input :store='authStore' stateKey='phone' type="text" placeholder="Phone number"></cui-input>
					</div>
					<div class="container mt-2" data-aos="fade">
						<label>Password</label>
						<cui-input :store='authStore' stateKey='password' type="password" placeholder="Password"></cui-input>
					</div>
					<div class="container mt-5 text-center">
						<cui-button @click="loginAdmin" class="w-100">Login</cui-button>
					</div>
					<div class="container mt-5 text-center text-gray">
						v1.0.0
					</div>
				</div>	
			</div>
		</div>
		
	</div>
</template>

<style scoped>
.img-wrap {
	background-color: var(--cui-blue-transparent);
}
.logo {
	max-width: 10rem;
}

h1 {
	font-weight: bolder;
}

.col {
	height: 100vh;
}

.img-container {
	background-image: url(../../assets/img/vehicle_scene.jpg);
	background-size: cover;
	height: 100vh;
}

.img-container div {
	backdrop-filter: blur(4px);
	background-color: var(--cui-blue-transparent);
	color: white;
	height: 100vh;
}

.form-container {
	height: 100vh;
	overflow: none;
}
</style>