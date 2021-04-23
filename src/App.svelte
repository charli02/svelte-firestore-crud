<script>
	import {db} from "./firebase";

	let task={
		name:"",
		description:""
	}
	let tasks=[];
	let editStatus = false;
	let currentId;

	const handleSubmit=()=>{
		if(!editStatus){
			addTask();
		}
		else{
			updateTask();
		}
		
		task={name:'', description:''};
	}

	db.collection('tasks').onSnapshot(querySnapshot=>{
		let docs=[]
		querySnapshot.forEach(doc=>{
			docs.push({...doc.data(), id:doc.id})
		})
		tasks=[...docs]
		console.log(tasks);
	})

	const addTask= async () =>{
		await db.collection('tasks').doc().set({
			...task, createdAt:Date.now()
		});
	}

	const updateTask = async () =>{
		await db.collection('tasks').doc(currentId).update(task);
	} 
	const deleteTask = async (id) =>{
		await db.collection('tasks').doc(id).delete();
	}

	const editTask = (currentTask) =>{
		editStatus = true;
		task.name=currentTask.name;
		task.description = currentTask.description;
		currentId = currentTask.id;
	}

	const onCancel = () =>{
		editStatus=false;
		task = {name:'', description:''}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input bind:value={task.name} type="text" placeholder="Write a new task">
	<textarea bind:value={task.description} rows="3" placeholder="Write a task description"></textarea>
	<button>
		{#if !editStatus}Save{:else}Update{/if}
	</button>
	{#if editStatus}
		<button on:click={onCancel}>Cancel</button>
	{/if}
</form>

{#each tasks as task}
	<div>
		<h5>{task.name}</h5>
		<p>{task.description}</p>
		<button on:click={deleteTask(task.id)}>Delete</button>
		<button on:click={editTask(task)}>Edit</button>
	</div>
{/each}

<style>
	
</style>