<script setup>
// import CuiInput from '@/components/CuiInput';
</script>

<template>
	<div class="menu-lg-screen pt-0">
		<div class="logo p-4 pt-0">
			<img src="@/assets/img/logo_without_bg.png">
		</div>
		<ul>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" to="/dashboard" class="p-3 rounded"><i class="fa fa-tachometer"></i> Dashboard</router-link></li>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/admin"><i class="fa fa-user"></i> Admin</router-link></li>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/owners"><i class="fa fa-users"></i> Owners</router-link></li>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/drivers"><i class="fa fa-steering-wheel"></i> Drivers</router-link></li>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/lga"><i class="fa fa-map"></i> LGA</router-link></li>
			<li><router-link v-ripple="'rgba(0,0,0,.2)'" class="p-3 rounded" to="/vehicle_type"><i class="fa fa-car"></i> Vehicle types</router-link></li>
		</ul>
	</div>
</template>

<style scoped>
.menu-lg-screen {
	background-color: var(--cui-white);
	width: 10rem;
	position: absolute;
	left: 0;
}

.menu-lg-screen img {
	width: 5rem;
	height: 5rem;
}

ul {
	list-style: none;
	/*background: blue;*/
	width: 100%;
}

li {
	margin-left: -2rem;
}

a {
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: left;
	background-color: ;
	width: 100%;
	color: var(--cui-blue);
}

a i {
	width: 2rem;
}

a:active {
	/*background-color: var(--cui-blue);*/
}
</style>

