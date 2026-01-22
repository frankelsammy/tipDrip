import NavBar from "@/components/navBar";
import TipHistoryTable from "@/components/TipHistory";
export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mt-10 px-8">
        <h1 className="flex justify-center text-3xl font-bold mb-4">Tip History</h1>
      </main>
       <hr className="my-4 border-t border-gray-200" />
      <div className="flex justify-center items-start mt-8">
        <TipHistoryTable accountId="acct_1RwOgDLl1l7Vem7d" />
      </div>
    </div>
  );
}
