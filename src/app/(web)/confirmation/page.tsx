export default function Confirmation() {
    return (
      <div className="container mx-auto text-center">
        <h1 className="font-heading text-green-800 mb-6">Payment Successful!</h1>
        <p className="font-normal text-lg">
          Thank you for your booking. Your payment has been successfully processed.
        </p>
        <a href="/" className="btn-primary mt-6 inline-block">
          Return to Home
        </a>
      </div>
    );
  }
  