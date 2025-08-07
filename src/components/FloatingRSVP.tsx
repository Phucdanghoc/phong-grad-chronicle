import React, { useState } from 'react';
import { Users, X, Send, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FloatingRSVPProps {
  isVisible?: boolean;
}

export default function FloatingRSVP({ isVisible = true }: FloatingRSVPProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem('rsvp-webhook-url') || ''
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên của bạn",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl.trim()) {
      setIsConfigOpen(true);
      toast({
        title: "Cần cấu hình",
        description: "Vui lòng cấu hình Zapier webhook URL trước",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          name: name.trim(),
          timestamp: new Date().toISOString(),
          date: new Date().toLocaleDateString('vi-VN'),
          time: new Date().toLocaleTimeString('vi-VN'),
          event: "Lễ Trao Bằng Tốt Nghiệp - Lê Thanh Phong",
          status: "Sẽ tham dự"
        }),
      });

      toast({
        title: "Thành công!",
        description: `Cảm ơn ${name}! Chúng tôi đã ghi nhận bạn sẽ tham dự.`,
      });
      
      setName('');
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending RSVP:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi xác nhận. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigSave = () => {
    localStorage.setItem('rsvp-webhook-url', webhookUrl);
    setIsConfigOpen(false);
    toast({
      title: "Đã lưu",
      description: "Zapier webhook URL đã được cấu hình thành công",
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating RSVP Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full shadow-2xl hover:scale-110 transition-all duration-500 animate-pulse-glow"
          title="Xác nhận tham dự"
        >
          <Users className="w-8 h-8 text-white mx-auto animate-bounce" />
          
          {/* Tooltip */}
          <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Xác nhận tham dự
          </span>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-grad-primary/30 animate-ping"></div>
        </button>

        {/* Config button */}
        <button
          onClick={() => setIsConfigOpen(true)}
          className="mt-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
          title="Cấu hình Zapier"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* RSVP Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white via-grad-light/20 to-white rounded-3xl p-8 shadow-2xl border border-grad-primary/30 max-w-md w-full animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-grad-dark">Xác Nhận Tham Dự</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-grad-dark mb-2">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full px-4 py-3 border-2 border-grad-primary/20 rounded-xl focus:border-grad-primary focus:ring-0 outline-none transition-colors duration-200 text-grad-dark placeholder:text-gray-400"
                  disabled={isLoading}
                />
              </div>

              <div className="bg-grad-light/30 rounded-xl p-4 border border-grad-primary/20">
                <p className="text-grad-dark font-medium mb-2">Lễ Trao Bằng Tốt Nghiệp</p>
                <p className="text-sm text-gray-600">
                  <strong>Ngày:</strong> 19/08/2025 (Thứ Ba)<br/>
                  <strong>Giờ:</strong> 9:30 AM<br/>
                  <strong>Địa điểm:</strong> Khu A - Trường ĐH Công nghiệp HN
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-gradient-to-r from-grad-primary to-grad-accent text-white font-semibold py-4 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isLoading ? 'Đang gửi...' : 'Chúng tôi sẽ đến với bạn!'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Thông tin của bạn sẽ được ghi nhận để chuẩn bị cho lễ trao bằng
            </p>
          </div>
        </div>
      )}

      {/* Config Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-grad-primary/30 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-grad-dark">Cấu hình Zapier</h3>
              <button
                onClick={() => setIsConfigOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grad-dark mb-2">
                  Zapier Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="w-full px-4 py-3 border-2 border-grad-primary/20 rounded-xl focus:border-grad-primary focus:ring-0 outline-none"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Hướng dẫn thiết lập:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Tạo một Zap mới trên Zapier</li>
                  <li>Chọn "Webhooks by Zapier" làm trigger</li>
                  <li>Chọn "Catch Hook" event</li>
                  <li>Copy webhook URL và paste vào ô trên</li>
                  <li>Kết nối với Google Sheets để lưu dữ liệu</li>
                </ol>
              </div>

              <button
                onClick={handleConfigSave}
                className="w-full bg-gradient-to-r from-grad-primary to-grad-accent text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}