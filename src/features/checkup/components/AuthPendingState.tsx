interface AuthPendingStateProps {
  multiFactorInfo?: {
    transactionId?: string;
    jobIndex?: number;
    threadIndex?: number;
  } | null;
  onCompleteAuth: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const AuthPendingState = ({
  multiFactorInfo,
  onCompleteAuth,
  onCancel,
  isLoading,
}: AuthPendingStateProps) => {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          간편인증 진행 중
        </h2>
      </div>
      <div className="px-6 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            간편인증 대기 중
          </h3>
          <p className="text-yellow-700 mb-4">
            선택하신 간편인증 앱에서 본인인증을 완료해주세요.
            <br />
            인증 완료 시간: 4분 30초
          </p>
          <div className="bg-gray-50 p-3 rounded text-sm mb-4">
            <p>
              <strong>Transaction ID:</strong> {multiFactorInfo?.transactionId}
            </p>
            <p>
              <strong>Job Index:</strong> {multiFactorInfo?.jobIndex}
            </p>
            <p>
              <strong>Thread Index:</strong> {multiFactorInfo?.threadIndex}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCompleteAuth}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {isLoading ? "확인 중..." : "인증 완료 확인"}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPendingState;
