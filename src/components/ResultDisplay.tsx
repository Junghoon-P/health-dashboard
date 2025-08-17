import type { CheckupData } from "@/features/checkup/type";

interface ResultDisplayProps {
  data: CheckupData | null;
}

const ResultDisplay = ({ data }: ResultDisplayProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-3">응답 프리뷰</h3>

      {!data && (
        <p className="text-sm text-gray-500">아직 데이터가 없습니다.</p>
      )}

      {data && (
        <pre className="text-xs whitespace-pre-wrap break-all bg-gray-50 border rounded-lg p-3">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ResultDisplay;
