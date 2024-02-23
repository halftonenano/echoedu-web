<script lang="ts">
	import PageFormat from '$lib/components/PageFormat.svelte';
	import ConfirmPhoneNumber from '$lib/components/account/ConfirmPhoneNumber.svelte';
	import { Button } from '$lib/components/ui/button';
	import { pb, signOut, user } from '$lib/pocketbase';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { toast } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { UserMinus } from 'lucide-svelte';
</script>

<PageFormat title="Account" description="Your EchoEDU Account">
	<h2 class="text-xl font-bold">Info</h2>
	<hr class="mt-2" />

	<div class="flex flex-col gap-5 md:flex-row">
		<div class="w-full p-5">
			<div class="flex items-center gap-3">
				<img src="/assets/google.png" alt="google logo" class="h-5" />
				{$user?.name}
			</div>
			<hr class="my-2" />
			{$user?.email}

			<Button
				class="mt-5 flex w-full items-center gap-2 shadow-sm"
				variant="outline"
				on:click={() => signOut()}><UserMinus size={16} />Sign Out</Button
			>
		</div>

		<div class="-mx-5 md:m-0">
			<div class="mx-auto w-fit md:mt-5">
				<ConfirmPhoneNumber />
			</div>
		</div>
	</div>

	<h2 class="mt-8 text-xl font-bold text-destructive">Danger Zone</h2>
	<hr class="mb-5 mt-2" />

	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button variant="destructive">Delete Account</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					on:click={() => {
						toast.promise(
							new Promise(async (resolve, reject) => {
								try {
									await pb.collection('users').delete($user?.id);
								} catch {
									reject();
								}
								signOut();
								goto('/signin');
								resolve(null);
							}),
							{
								loading: 'Deleting your account...',
								success: `Your account has been deleted!`,
								error: 'Something went wrong'
							},
							{ duration: 10000 }
						);
					}}>Delete Account</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</PageFormat>
