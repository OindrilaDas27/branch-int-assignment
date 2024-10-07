# branch-int-assignment

Here’s a polished version of the **readme.md** for your project:

---

# Branch International Assignment

## Additional Features Implemented

1. Figure out a scheme to help agents divide work amongst themselves, and to prevent multiple agents working on the same message at once.

2. Explore ways to surface messages that are more urgent and in need of immediate attention. For example, customers who are asking about the loan approval process or when their loan will be disbursed might have more urgency than those asking how to update information on their Branch account.

3. Explore ways to surface additional information about customers (e.g. external profiles or some internal information we have about them) in the UI, to provide context to agents.

4. Implement a canned message feature that allows agents to quickly respond to enquiries using a set of pre-configured stock messages.

---

## Setup Instructions

### Initial Setup

Ensure that **Node.js** and **npm** are installed on your machine before proceeding.

### Clone the Repository

```bash
git clone https://github.com/OindrilaDas27/branch-int-assignment
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a `.env` file and add the following field:

```
MONGO_URI=<Your MongoDB URI>
PORT=5000
```

3. Install the necessary Node modules:

```bash
npm install
```

4. Start the backend server:

```bash
npm start
```

The backend should now be running on **localhost:5000**.

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd branch-frontend
```

2. Install the required Node modules:

```bash
npm install
```

3. Start the frontend server:

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
