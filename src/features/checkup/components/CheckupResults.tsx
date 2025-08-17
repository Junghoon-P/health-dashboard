import type { CheckupData } from "@/features/checkup/type";

interface CheckupResultsProps {
  finalData?: CheckupData | null;
  onNewQuery: () => void;
}

const CheckupResults = ({ finalData, onNewQuery }: CheckupResultsProps) => {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">건강검진 결과</h2>
      </div>
      <div className="px-6 py-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            건강검진 결과 조회 완료
          </h3>
          {finalData && (
            <div className="space-y-4">
              {finalData.patientName && (
                <p className="text-sm">
                  <strong>검진대상:</strong> {finalData.patientName}
                </p>
              )}

              {finalData.overviewList && finalData.overviewList.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">한눈에 보기</h4>
                  <div className="space-y-2">
                    {finalData.overviewList.map((overview, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded border text-sm"
                      >
                        <p>
                          <strong>검진일:</strong> {overview.checkupDate}
                        </p>
                        <p>
                          <strong>신장:</strong> {overview.height}
                        </p>
                        <p>
                          <strong>체중:</strong> {overview.weight}
                        </p>
                        <p>
                          <strong>혈압:</strong> {overview.bloodPressure}
                        </p>
                        <p>
                          <strong>판정:</strong> {overview.evaluation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {finalData.resultList && finalData.resultList.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">검진 결과 목록</h4>
                  <div className="space-y-2">
                    {finalData.resultList.map((result, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded border text-sm"
                      >
                        <p>
                          <strong>검진일:</strong> {result.checkupDate}
                        </p>
                        <p>
                          <strong>검진종류:</strong> {result.checkupType}
                        </p>
                        <p>
                          <strong>기관명:</strong> {result.organizationName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onNewQuery}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
          >
            새로 조회하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckupResults;
