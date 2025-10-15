export default {
	async fetch(request: Request): Promise<Response> {
    console.log(await request.json());

		return new Response("Hello from Bun Lambda!", {
			headers: {
				"Content-Type": "text/plain",
			},
			status: 200,
		});
	},
};
