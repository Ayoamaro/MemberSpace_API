import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 MemberSpace API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error arrancando el servidor:", error);
    process.exit(1);
  }
};

startServer();
