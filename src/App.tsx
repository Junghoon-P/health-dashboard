import { useState } from "react";
import { useCheckupMutation } from "@/features/checkup/useCheckupMutation";
import type { CheckupRequest, CheckupData } from "@/features/checkup/type";
import CheckupForm from "@/components/CheckupForm";
import ResultDisplay from "@/components/ResultDisplay";

const App = () => {
  const { mutateAsync, isPending, isError, error, data } = useCheckupMutation();
  const [lastData, setLastData] = useState<CheckupData | null>(null);

  const handleFormSubmit = async (formData: CheckupRequest) => {
    try {
      const res = await mutateAsync(formData);
      if (res.status === "success" && res.data) {
        // 바로 결과가 온 경우
        setLastData(res.data);
      } else if (res.data?.transactionId) {
        // 추가인증 흐름 분기 (다음 단계에서 폴링/확인 처리 예정)
        setLastData(res.data);
        alert("간편인증이 필요합니다. 휴대폰에서 승인해주세요.");
      } else {
        alert(res.message ?? "요청이 완료되었지만 표시할 데이터가 없습니다.");
      }
    } catch (e) {
      // isError에서 이미 잡히지만 사용자 알림도 함께
      console.error(e);
    }
  };

  console.log("data", data);
  console.log("lastData", lastData);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <CheckupForm
          onSubmit={handleFormSubmit}
          isLoading={isPending}
          error={isError ? String(error?.message ?? "알 수 없는 오류") : null}
        />

        <ResultDisplay data={lastData} />
      </section>
    </main>
  );
};

export default App;
