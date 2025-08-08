// import { useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData(); // Get any errors returned from the action function.

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      {/* <h2>Ready to order? Let's go!</h2> */}

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* this input holds the cart data */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? "Ordering..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData); // Transform FormData into plain object

  const order = {
    ...data,
    cart: JSON.parse(data.cart), // Parse the cart data
    priority: data.priority === "on", // convert priority to boolean
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Invalid phone number";

  if (Object.keys(errors).length > 0) {
    return errors; // If there are errors, return them to the form.
  }

  const newOrder = await createOrder(order); // Call the createOrder function with the order object to post the data into the fake api.

  return redirect(`/order/${newOrder.id}`); // Redirect to the new order's page.
}

export default CreateOrder;

/*
 * we use redirect() to navigate the user to the new order's page after successfully creating the order.
 * navigate function not used here because we aren't in a component.
 */
