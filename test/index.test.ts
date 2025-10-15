import { expect, test, describe } from "bun:test";
import handler from "../index";

describe("Payment Strategy Pattern", () => {
	test("should process applepay payment successfully", async () => {
		const request = new Request("http://localhost", {
			body: JSON.stringify({ type: "applepay" }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);
		const text = await response.text();

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
		expect(text).toBe("applepay payment processed");
	});

	test("should process paypal payment successfully", async () => {
		const request = new Request("http://localhost", {
			body: JSON.stringify({ type: "paypal" }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);
		const text = await response.text();

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
		expect(text).toBe("paypal payment processed");
	});

	test("should process scheme payment successfully", async () => {
		const request = new Request("http://localhost", {
			body: JSON.stringify({ type: "scheme" }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);
		const text = await response.text();

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
		expect(text).toBe("scheme payment processed");
	});

	test("should return error when type is missing", async () => {
		const request = new Request("http://localhost", {
			body: JSON.stringify({}),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);
		const text = await response.text();

		expect(response.status).toBe(400);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
		expect(text).toBe("The 'type' field is required");
	});

	test("should return error for unsupported payment type", async () => {
		const request = new Request("http://localhost", {
			body: JSON.stringify({ type: "bitcoin" }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);
		const text = await response.text();

		expect(response.status).toBe(400);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
		expect(text).toBe("Type 'bitcoin' is not supported. Valid types are: applepay, paypal, scheme");
	});

	test("should return error for invalid JSON", async () => {
		const request = new Request("http://localhost", {
			body: "invalid json",
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		const response = await handler.fetch(request);

		expect(response.status).toBe(500);
		expect(response.headers.get("Content-Type")).toBe("text/plain");
	});
});
