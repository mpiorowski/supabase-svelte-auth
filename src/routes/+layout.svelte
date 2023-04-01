<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>
