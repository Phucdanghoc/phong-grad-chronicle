'use client'
import { GraduationCap, Award, Calendar, MapPin, Users, Star, ChevronDown, Clock, Heart, BookOpen, Trophy, Sparkles, ArrowUp, Home, Info, CalendarDays, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import avatarPhong from '@/assets/avatar-phong.jpg'
import memoryStudy1 from '@/assets/memory-study-1.jpg'
import memoryStudy2 from '@/assets/memory-study-2.jpg'
import memoryStudy3 from '@/assets/memory-study-3.jpg'

export default function GraduationLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section')
      const scrollY = window.scrollY
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('.section')
    sections[sectionIndex]?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animated particles component
  const FloatingParticles = ({ count = 15 }) => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full opacity-40 animate-float-${i % 3}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  )

  // Navigation component
  const SectionNavigation = () => (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
      {[
        { icon: Home, label: 'Trang chủ' },
        { icon: Info, label: 'Hành trình' },
        { icon: CalendarDays, label: 'Lời mời' },
        { icon: MessageCircle, label: 'Cảm ơn' }
      ].map((item, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`group relative w-12 h-12 rounded-full transition-all duration-300 ${
            currentSection === index 
              ? 'bg-grad-primary shadow-lg scale-110' 
              : 'bg-white/20 backdrop-blur-sm hover:bg-grad-light/30'
          }`}
          title={item.label}
        >
          <item.icon className={`w-6 h-6 transition-colors duration-300 ${
            currentSection === index ? 'text-white' : 'text-grad-primary'
          } mx-auto`} />
          <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 rounded-full bg-grad-secondary/20 backdrop-blur-sm hover:bg-grad-secondary/40 transition-all duration-300 flex items-center justify-center group"
        title="Về đầu trang"
      >
        <ArrowUp className="w-6 h-6 text-grad-secondary group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 text-white overflow-hidden">
      {/* Custom CSS for enhanced animations */}
      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(-180deg) scale(1.2); opacity: 0.7; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-25px) rotate(360deg); opacity: 0.9; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4); }
        }
        .animate-gradient { animation: gradient-shift 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-float-0 { animation: float-0 4s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
      `}</style>

      <SectionNavigation />

      {/* SECTION 1: Introduction */}
      <section className="section min-h-screen relative flex items-center justify-center overflow-hidden">
        <FloatingParticles count={20} />
        
        {/* Dynamic background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-br from-grad-accent to-grad-secondary rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-gradient-to-br from-grad-light to-grad-primary rounded-full opacity-10 animate-bounce delay-2000"></div>
        </div>

        <div className={`relative z-10 text-center px-8 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {/* Avatar Image */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <img 
                src={avatarPhong} 
                alt="Lê Thanh Phong - Avatar"
                className="w-48 h-48 rounded-full shadow-2xl border-8 border-grad-primary/50 animate-pulse-glow object-cover"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-grad-accent to-grad-primary rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-grad-secondary to-grad-accent rounded-full animate-ping delay-500"></div>
            </div>
          </div>

          {/* Animated graduation cap with glow */}
          <div className="mb-12 relative">
            <div className="inline-block animate-bounce">
              <div className="bg-gradient-to-br from-grad-primary via-grad-accent to-grad-secondary p-8 rounded-full shadow-2xl animate-pulse-glow">
                <GraduationCap className="w-20 h-20 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Animated title with gradient text */}
          <h1 className="text-8xl md:text-9xl font-extrabold mb-8 tracking-wider bg-gradient-to-r from-grad-primary via-grad-accent to-grad-secondary bg-clip-text text-transparent animate-gradient bg-300% animate-pulse">
            LÊ THANH PHONG
          </h1>

          <div className="flex justify-center mb-8">
            <div className="w-80 h-2 bg-gradient-to-r from-transparent via-grad-primary to-transparent rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl font-light text-grad-light mb-6 animate-fade-in-up delay-500">
            Cử Nhân Xuất Sắc
          </h2>

          <p className="text-2xl text-yellow-200 mb-12 animate-fade-in-up delay-1000 font-light">
            Trường Đại học Công nghiệp Hà Nội
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-6 mb-12">
            {[Star, Sparkles, Trophy].map((Icon, index) => (
              <div key={index} className="animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                <Icon className="w-8 h-8 text-grad-primary animate-pulse" />
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-grad-light text-sm mb-2 animate-pulse">Cuộn xuống để khám phá</span>
              <ChevronDown className="w-10 h-10 text-grad-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Information and Study Process */}
      <section className="section min-h-screen relative py-20 bg-gradient-to-br from-yellow-900 via-amber-800 to-orange-900">
        <FloatingParticles count={12} />
        
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <BookOpen className="w-12 h-12 text-grad-primary animate-bounce" />
              <h3 className="text-5xl font-bold text-transparent bg-gradient-to-r from-grad-primary to-grad-accent bg-clip-text">
                Hành Trình Học Tập
              </h3>
              <BookOpen className="w-12 h-12 text-grad-primary animate-bounce delay-500" />
            </div>
            <div className="w-48 h-1 bg-gradient-to-r from-grad-primary to-grad-accent mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Study Journey Timeline with Memory Images */}
          <div className="relative mb-16">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-grad-primary via-grad-accent to-grad-secondary rounded-full transform -translate-x-1/2 animate-pulse"></div>
            
            {[
              { 
                year: "2021", 
                title: "Khởi Đầu Hành Trình", 
                desc: "Bắt đầu chương trình Cử Nhân tại Trường Đại học Công nghiệp Hà Nội với niềm đam mê học tập",
                icon: GraduationCap,
                position: "left",
                image: memoryStudy1
              },
              { 
                year: "2022", 
                title: "Phát Triển Kỹ Năng", 
                desc: "Tham gia tích cực các hoạt động nghiên cứu khoa học và dự án thực tế",
                icon: Award,
                position: "right",
                image: memoryStudy2
              },
              { 
                year: "2023", 
                title: "Thành Tựu Đặc Biệt", 
                desc: "Hack thành công hệ thống web trường - Thể hiện kỹ năng công nghệ xuất sắc",
                icon: Trophy,
                position: "left",
                image: memoryStudy3
              },
              { 
                year: "2024", 
                title: "Hoàn Thành Xuất Sắc", 
                desc: "Tốt nghiệp với bằng Cử Nhân ưu tú, sẵn sàng cho những thử thách mới",
                icon: Star,
                position: "right",
                image: avatarPhong
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative flex items-center mb-12 ${item.position === 'right' ? 'flex-row-reverse' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`w-1/2 ${item.position === 'right' ? 'pl-12' : 'pr-12'}`}>
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 border border-grad-primary/30">
                    <div className="flex items-center mb-4">
                      <item.icon className="w-8 h-8 text-grad-primary mr-4 animate-pulse" />
                      <span className="text-3xl font-bold text-grad-light">{item.year}</span>
                    </div>
                    <h4 className="text-2xl font-semibold text-white mb-3">{item.title}</h4>
                    <p className="text-yellow-200 leading-relaxed mb-4">{item.desc}</p>
                    {/* Memory Image */}
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={item.image} 
                        alt={`Kỷ niệm ${item.year}`}
                        className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 w-6 h-6 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full border-4 border-white shadow-xl animate-pulse transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Award, title: "Điểm Trung Bình Cao", desc: "Thành tích học tập xuất sắc", color: "from-grad-primary to-grad-accent" },
              { icon: Users, title: "Hoạt Động Xã Hội", desc: "Tích cực tham gia cộng đồng", color: "from-grad-accent to-grad-secondary" },
              { icon: Trophy, title: "Kỹ Năng Công Nghệ", desc: "Chuyên môn vượt trội", color: "from-grad-secondary to-grad-primary" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:scale-105 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4 animate-pulse-glow`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-yellow-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Time, Address and Invitation */}
      <section className="section min-h-screen relative py-20 bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900">
        <FloatingParticles count={15} />
        
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <Calendar className="w-12 h-12 text-grad-primary animate-bounce" />
              <h3 className="text-5xl font-bold text-transparent bg-gradient-to-r from-grad-primary to-grad-accent bg-clip-text">
                Lời Mời Tham Dự
              </h3>
              <MapPin className="w-12 h-12 text-grad-primary animate-bounce delay-500" />
            </div>
            <div className="w-48 h-1 bg-gradient-to-r from-grad-primary to-grad-accent mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Main invitation card */}
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 mb-12 animate-fade-in-up">
            <div className="text-center mb-12">
              <div className="inline-block p-6 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full mb-6 animate-pulse-glow">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <h4 className="text-4xl font-bold text-white mb-4">Trân Trọng Kính Mời</h4>
              <p className="text-xl text-yellow-200">Quý Thầy Cô, Bạn Bè và Gia Đình đến dự</p>
              <p className="text-2xl font-semibold text-grad-light mt-2">Lễ Trao Bằng Tốt Nghiệp</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/10 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up delay-300">
                <div className="w-20 h-20 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h5 className="text-2xl font-bold text-white mb-3">Ngày Tổ Chức</h5>
                <p className="text-3xl font-bold text-grad-light mb-2">19/08/2025</p>
                <p className="text-yellow-200">Thứ Ba</p>
              </div>

              <div className="text-center p-6 bg-white/10 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up delay-600">
                <div className="w-20 h-20 bg-gradient-to-br from-grad-accent to-grad-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h5 className="text-2xl font-bold text-white mb-3">Thời Gian</h5>
                <p className="text-3xl font-bold text-grad-light mb-2">9:30 AM</p>
                <p className="text-yellow-200">Lễ Trao Bằng</p>
              </div>

              <div className="text-center p-6 bg-white/10 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up delay-900">
                <div className="w-20 h-20 bg-gradient-to-br from-grad-secondary to-grad-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h5 className="text-2xl font-bold text-white mb-3">Địa Điểm</h5>
                <p className="text-3xl font-bold text-grad-light mb-2">Khu A</p>
                <p className="text-yellow-200">Trường ĐH Công nghiệp HN</p>
              </div>
            </div>

            <div className="text-center mt-12 p-6 bg-gradient-to-r from-grad-primary/50 to-grad-accent/50 rounded-2xl border border-grad-light/30">
              <p className="text-lg text-white leading-relaxed">
                Sự hiện diện của Quý vị sẽ là niềm vinh hạnh và động lực to lớn cho LÊ THANH PHONG 
                trong hành trình mới sắp tới. Chân thành cảm ơn!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Thanks */}
      <section className="section min-h-screen relative py-20 bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 flex items-center">
        <FloatingParticles count={25} />
        
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <Heart className="w-16 h-16 text-grad-primary animate-pulse" />
              <h3 className="text-6xl font-bold text-transparent bg-gradient-to-r from-grad-primary to-grad-accent bg-clip-text">
                Lời Cảm Ơn
              </h3>
              <Heart className="w-16 h-16 text-grad-primary animate-pulse delay-500" />
            </div>
          </div>

          {/* Thank you message */}
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 mb-12 animate-fade-in-up">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-grad-primary to-grad-accent rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>

            <h4 className="text-4xl font-bold text-white mb-8">Tri Ân Sâu Sắc</h4>
            
            <div className="space-y-8 text-lg text-yellow-100 leading-relaxed">
              <p className="animate-fade-in-up delay-300">
                Trước tiên, xin gửi lời biết ơn sâu sắc nhất đến <span className="text-grad-light font-semibold">Gia Đình</span> - 
                những người đã luôn bên cạnh, động viên và tạo điều kiện tốt nhất cho con đường học tập của con.
              </p>
              
              <p className="animate-fade-in-up delay-600">
                Xin chân thành cảm ơn các <span className="text-grad-light font-semibold">Thầy Cô</span> tại Trường Đại học Công nghiệp Hà Nội 
                đã tận tình giảng dạy, hướng dẫn và truyền đạt kiến thức quý báu suốt những năm qua.
              </p>
              
              <p className="animate-fade-in-up delay-900">
                Cảm ơn tất cả <span className="text-grad-light font-semibold">Bạn Bè</span> đã cùng đồng hành, học hỏi và 
                tạo nên những kỷ niệm đẹp không thể nào quên trong suốt thời gian đại học.
              </p>
              
              <p className="animate-fade-in-up delay-1200 text-xl font-semibold text-grad-light">
                Thành công hôm nay là nhờ sự đóng góp và yêu thương của tất cả mọi người. 
                Xin chân thành cảm ơn từ tận đáy lòng!
              </p>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center space-x-8 mt-12">
              {[Heart, Star, Sparkles, Trophy].map((Icon, index) => (
                <div key={index} className="animate-bounce" style={{ animationDelay: `${index * 0.3}s` }}>
                  <Icon className="w-12 h-12 text-grad-primary animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in-up delay-1500">
            <div className="mb-6">
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-grad-primary to-grad-accent bg-clip-text mb-2">
                LÊ THANH PHONG
              </div>
              <p className="text-yellow-200">Cử Nhân - Trường Đại học Công nghiệp Hà Nội</p>
            </div>
            
            <div className="text-yellow-300 text-sm">
              <p>© 2024 - Kỷ niệm ngày tốt nghiệp đáng nhớ</p>
              <p className="mt-2">Với tình yêu và lòng biết ơn ❤️</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}