// /hooks/usePaymentPlans.ts
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const usePaymentPlans = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "paymentPlans"));
        const plansList: any[] = [];
        querySnapshot.forEach((doc) => {
          plansList.push({ ...doc.data(), id: doc.id });
        });
        setPlans(plansList);
      } catch (error) {
        console.error("Error fetching payment plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentPlans();
  }, []);

  return { plans, loading };
};
