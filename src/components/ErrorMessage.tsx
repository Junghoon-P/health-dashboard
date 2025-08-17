interface ErrorMessageProps {
  error: { message?: string } | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 shadow-sm mb-6">
      <div className="px-6 py-4">
        <p className="text-red-700 text-sm">
          오류가 발생했습니다: {error.message || "알 수 없는 오류"}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
