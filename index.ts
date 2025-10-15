enum PaymentType {
	ApplePay = "applepay",
	PayPal = "paypal",
	Scheme = "scheme",
}

interface PaymentRequest {
	type: string;
}

interface PaymentStrategy {
	execute(data: PaymentRequest): Response;
}

class ApplePayPayment implements PaymentStrategy {
	execute(data: PaymentRequest): Response {
		return new Response("applepay payment processed", {
			headers: { "Content-Type": "text/plain" },
			status: 200,
		});
	}
}

class PayPalPayment implements PaymentStrategy {
	execute(data: PaymentRequest): Response {
		return new Response("paypal payment processed", {
			headers: { "Content-Type": "text/plain" },
			status: 200,
		});
	}
}

class SchemePayment implements PaymentStrategy {
	execute(data: PaymentRequest): Response {
		return new Response("scheme payment processed", {
			headers: { "Content-Type": "text/plain" },
			status: 200,
		});
	}
}

const strategies = new Map<string, PaymentStrategy>([
	[PaymentType.ApplePay, new ApplePayPayment()],
	[PaymentType.PayPal, new PayPalPayment()],
	[PaymentType.Scheme, new SchemePayment()],
]);

export default {
	async fetch(request: Request): Promise<Response> {
		try {
			const body = await request.json() as PaymentRequest;

			if (!body.type) {
				return new Response(
					"The 'type' field is required",
					{
						headers: { "Content-Type": "text/plain" },
						status: 400,
					}
				);
			}

			const strategy = strategies.get(body.type);

			if (!strategy) {
				return new Response(
					`Type '${body.type}' is not supported. Valid types are: ${Object.values(PaymentType).join(", ")}`,
					{
						headers: { "Content-Type": "text/plain" },
						status: 400,
					}
				);
			}

			return strategy.execute(body);
		} catch (error) {
			return new Response(
				error instanceof Error ? error.message : "Unknown error",
				{
					headers: { "Content-Type": "text/plain" },
					status: 500,
				}
			);
		}
	},
};
