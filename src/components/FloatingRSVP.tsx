import React, { useState, useEffect } from 'react';
import { Users, X, Send, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FloatingRSVPProps {
  isVisible?: boolean;
}

interface RSVPData {
  name: string;
  timestamp: string;
}

export default function FloatingRSVP({ isVisible = true }: FloatingRSVPProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem('n8n-webhook-url') || 'https://n8n.hololab.asia/webhook-test/19694915-37c4-4169-97d5-9e46b92bc5c8'
  );
  const [attendees, setAttendees] = useState<RSVPData[]>([]);
  const { toast } = useToast();

  // Fetch existing attendees on component mount
  useEffect(() => {
    const fetchAttendees = async () => {
      const getUrl = localStorage.getItem('n8n-get-webhook-url');
      if (getUrl) {
        try {
          const response = await fetch("https://n8n.hololab.asia/webhook/19694915-37c4-4169-97d5-9e46b92bc5c8");
          if (response.ok) {
            console.log(response.body);
            
            const data = await response.json();
            // Assuming n8n returns array of attendees
            if (Array.isArray(data)) {
              setAttendees(data);
            }
          }
        } catch (error) {
          console.log('No existing attendees found or error fetching');
        }
      }
    };

    // fetchAttendees();
  }, []);

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
        description: "Vui lòng cấu hình n8n webhook URL trước",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://n8n.hololab.asia/webhook/19694915-37c4-4169-97d5-9e46b92bc5c8", {
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
      
      // Add to local attendees list
      setAttendees(prev => [...prev, { name: name.trim(), timestamp: new Date().toISOString() }]);
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
    localStorage.setItem('n8n-webhook-url', webhookUrl);
    setIsConfigOpen(false);
    toast({
      title: "Đã lưu",
      description: "n8n webhook URL đã được cấu hình thành công",
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Scrolling Names Display */}
      {attendees.length > 0 && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-yellow-400 text-yellow-900 py-2 overflow-hidden">
          <div className="flex flex-col">
            {/* First scrolling line */}
            <div className="flex animate-scroll-left whitespace-nowrap">
              {[...attendees, ...attendees, ...attendees].map((attendee, index) => (
                <span key={`line1-${index}`} className="inline-block mx-8 font-semibold">
                  🎓 {attendee.name} sẽ tham dự
                </span>
              ))}
            </div>
            {/* Second scrolling line */}
            <div className="flex animate-scroll-right whitespace-nowrap">
              {[...attendees.slice().reverse(), ...attendees.slice().reverse(), ...attendees.slice().reverse()].map((attendee, index) => (
                <span key={`line2-${index}`} className="inline-block mx-8 font-semibold">
                  ⭐ {attendee.name} - Chào mừng!
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating RSVP Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
          title="Xác nhận tham dự"
        >
          <Users className="w-8 h-8 text-yellow-900 mx-auto" />
          
          {/* Tooltip */}
          <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Xác nhận tham dự
          </span>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping"></div>
        </button>

        {/* Config button */}
        {/* <button
          onClick={() => setIsConfigOpen(true)}
          className="mt-4 w-12 h-12 bg-yellow-300 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300"
          title="Cấu hình n8n"
        >
          <Settings className="w-5 h-5 text-yellow-900" />
        </button> */}
      </div>

      {/* RSVP Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 max-w-md w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-900" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-900">Xác Nhận Tham Dự</h3>
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
                <label htmlFor="name" className="block text-sm font-medium text-yellow-900 mb-2">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:border-yellow-400 focus:ring-0 outline-none transition-colors duration-200 text-yellow-900"
                  disabled={isLoading}
                />
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                <p className="text-yellow-900 font-medium mb-2">Lễ Trao Bằng Tốt Nghiệp</p>
                <p className="text-sm text-yellow-800">
                  <strong>Ngày:</strong> 19/08/2025 (Thứ Ba)<br/>
                  <strong>Giờ:</strong> 9:30 AM<br/>
                  <strong>Địa điểm:</strong> Khu A - Trường ĐH Công nghiệp HN
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-yellow-700 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isLoading ? 'Đang gửi...' : 'Chúng tôi sẽ đến với bạn!'}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Custom scrolling animation styles */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }
      `}</style>
    </>
  );
}