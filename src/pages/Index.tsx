import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Index = () => {
  const [activeTab, setActiveTab] = useState('report');
  
  // Состояние для синхронизации данных между вкладками
  const [reportData, setReportData] = useState({
    date: new Date().toLocaleDateString('ru-RU'),
    analysisNumber: '№ В/П 01442-25',
    clientName: '[Имя клиента]',
    clientData: '',
    selectedTemplate: '',
    customTemplateText: '',
    promoCode: 'MINI2024',
  });

  // Расширенный список из 15 шаблонных текстов результатов
  const resultTemplates = [
    {
      id: '1',
      title: 'Высокий уровень доверия',
      text: `Здравствуйте, ${reportData.clientName}!\nМы внимательно проанализировали все ваши ответы на вопросы теста. В целом, ваши отношения демонстрируют достаточно высокий уровень доверия и взаимопонимания, что всегда является отличной основой для стабильности пары. Вместе с тем, некоторые нюансы в поведении вашего партнёра и реакции на важные моменты могут наводить на размышления. Внимание к таким деталям — естественная часть любого близкого союза, ведь люди меняются, а вместе с ними меняются и отношения. Иногда именно такие «маленькие знаки» помогают взглянуть на ситуацию глубже. Если вы чувствуете, что хотели бы немного больше уверенности, стоит задуматься о том, чтобы получить более полный и объективный анализ — это поможет сохранить спокойствие и гармонию в паре.`
    },
    {
      id: '2', 
      title: 'Скрытая напряженность',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы свидетельствуют о том, что в ваших отношениях присутствует доверие, но также встречаются и небольшие признаки скрытой напряжённости или вопросов, которые остаются на поверхности. Это абсолютно нормальное явление, ведь в длительных отношениях важно не только доверять, но и понимать, что иногда мы можем по-разному воспринимать одни и те же события. Ваши наблюдения, чувства и интуиция — ценный ресурс, который помогает поддерживать связь и разбираться в сложных ситуациях. Психологически доказано, что именно такое внимание к деталям сохраняет отношения в долгосрочной перспективе. В случае если вам захочется прояснить некоторые моменты объективно, обращение к экспертам по проверке партнёров может помочь увидеть те оттенки, которые остаются за рамками обычного восприятия.`
    },
    {
      id: '3',
      title: 'Элементы неопределенности', 
      text: `Здравствуйте, ${reportData.clientName}!\nПосле тщательного изучения ваших ответов мы видим, что ваши отношения имеют как положительные стороны, так и элементы неопределённости, вызывающие внутренние вопросы. Это естественно — все пары проходят через периоды, когда баланс доверия колеблется, а эмоции и мысли становятся более насыщенными и противоречивыми. Иногда именно в такие моменты стоит уделить внимание не только чувствам, но и объективным фактам, которые помогают сделать более ясные выводы. Обратите внимание на свою интуицию и стремление разобраться — именно это помогает сохранить близость и обрести уверенность в будущем.`
    },
    {
      id: '4',
      title: 'Признаки беспокойства',
      text: `Здравствуйте, ${reportData.clientName}!\nАнализ ваших ответов показывает, что в отношениях присутствуют моменты, вызывающие у вас определенное беспокойство. Подобные переживания говорят о вашей чуткости и внимательности к партнеру, что является важной составляющей крепких отношений. Однако важно различать обоснованные опасения и естественную тревожность, которая может возникать в любых близких отношениях. Ваша интуиция подсказывает обратить внимание на некоторые детали — и это абсолютно правильно. Профессиональная проверка поможет получить объективную картину и либо развеять сомнения, либо подтвердить необходимость более внимательного отношения к ситуации.`
    },
    {
      id: '5',
      title: 'Потребность в ясности',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы демонстрируют желание получить больше ясности в отношениях с партнером. Стремление к пониманию и открытости — здоровая основа любых серьезных отношений. Вы проявляете мудрость, обращая внимание на детали и нюансы поведения, которые могут быть важными индикаторами. В современных отношениях особенно ценно умение объективно оценивать ситуацию, не полагаясь только на эмоции. Профессиональный анализ поможет вам получить четкое представление о том, насколько ваши переживания обоснованы, и даст возможность принимать взвешенные решения относительно будущего ваших отношений.`
    },
    {
      id: '6',
      title: 'Интуитивные сигналы',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы говорят о том, что ваша интуиция улавливает определенные сигналы, которые заслуживают внимания. Женская интуиция — мощный инструмент, который часто помогает распознать то, что не всегда очевидно на поверхности. Ваше желание разобраться в ситуации показывает зрелость и ответственный подход к отношениям. Важно не игнорировать внутренние ощущения, но и не давать им полностью управлять вашими решениями. Объективная проверка поможет либо подтвердить ваши опасения, либо успокоить и показать, что беспокойство было напрасным.`
    },
    {
      id: '7',
      title: 'Поиск истины',
      text: `Здравствуйте, ${reportData.clientName}!\nИз ваших ответов видно стремление узнать правду о ваших отношениях. Это естественное и здоровое желание — каждый человек имеет право знать, на что он может рассчитывать в отношениях. Ваша готовность искать ответы на сложные вопросы говорит о серьезности ваших намерений и зрелости подхода к личной жизни. Профессиональная проверка станет инструментом, который поможет получить объективную информацию и принять обоснованные решения о дальнейшем развитии отношений.`
    },
    {
      id: '8',
      title: 'Необходимость проверки',
      text: `Здравствуйте, ${reportData.clientName}!\nАнализируя ваши ответы, мы видим четкие признаки того, что проверка партнера может быть полезной для вашего спокойствия. Ваши наблюдения и переживания не случайны — они отражают реальные изменения в поведении или отношении партнера. Доверие — основа отношений, но оно должно подкрепляться фактами, а не слепой верой. Получение объективной информации поможет либо укрепить доверие, либо защитить себя от возможных проблем в будущем.`
    },
    {
      id: '9',
      title: 'Защита интересов',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы показывают, что вы заботитесь о защите своих интересов в отношениях, что является абсолютно правильным подходом. Современные отношения требуют не только любви, но и мудрости в принятии решений. Ваше желание убедиться в надежности партнера — признак ответственного отношения к собственному будущему. Профессиональная проверка поможет получить полную картину и принять решения, основанные на фактах, а не на предположениях.`
    },
    {
      id: '10',
      title: 'Восстановление доверия',
      text: `Здравствуйте, ${reportData.clientName}!\nИз ваших ответов понятно, что в отношениях возникли ситуации, которые поколебали доверие. Это болезненный опыт, но ваше стремление разобраться в происходящем показывает желание сохранить отношения, если это возможно. Восстановление доверия — сложный процесс, который требует полной ясности о реальном положении дел. Объективная проверка поможет понять, стоит ли работать над восстановлением отношений или лучше принять решение о их завершении.`
    },
    {
      id: '11',
      title: 'Профилактическая проверка',
      text: `Здравствуйте, ${reportData.clientName}!\nВаш подход к проверке партнера носит профилактический характер, что говорит о мудром и дальновидном отношении к отношениям. Лучше убедиться в надежности партнера заранее, чем столкнуться с неприятными сюрпризами в будущем. Ваша осторожность — не признак недоверия, а проявление заботы о собственном эмоциональном и материальном благополучии. Такой подход поможет строить отношения на прочной основе взаимного уважения и честности.`
    },
    {
      id: '12',
      title: 'Подтверждение подозрений',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы указывают на то, что у вас есть конкретные основания для беспокойства. Подобные ситуации требуют деликатного, но решительного подхода. Игнорирование очевидных признаков может привести к более серьезным последствиям в будущем. Ваше решение провести проверку — правильный шаг для получения ясности. Независимо от результатов, вы будете знать правду и сможете принимать решения, основываясь на реальных фактах.`
    },
    {
      id: '13',
      title: 'Эмоциональная защита',
      text: `Здравствуйте, ${reportData.clientName}!\nИз ваших ответов видно, что вы стремитесь защитить себя от эмоциональных травм и разочарований. Это мудрый подход — лучше знать правду, какой бы она ни была, чем жить в неведении. Ваша эмоциональная зрелость проявляется в готовности столкнуться с реальностью и принять соответствующие меры. Профессиональная проверка поможет либо развеять сомнения и укрепить отношения, либо предоставит информацию для принятия важных жизненных решений.`
    },
    {
      id: '14',
      title: 'Стремление к честности',
      text: `Здравствуйте, ${reportData.clientName}!\nВаши ответы отражают стремление к честности и открытости в отношениях. Вы понимаете, что настоящая близость возможна только при условии взаимной искренности. Ваше желание убедиться в честности партнера — не проявление недоверия, а требование к качеству отношений. Каждый человек заслуживает честных и открытых отношений, основанных на взаимном уважении и доверии.`
    },
    {
      id: '15',
      title: 'Планирование будущего',
      text: `Здравствуйте, ${reportData.clientName}!\nВаш подход к проверке партнера свидетельствует о серьезности ваших планов на будущее. Вы понимаете важность построения отношений на прочной основе взаимного доверия и честности. Перед тем как делать серьезные шаги — будь то совместное проживание, брак или общие инвестиции — разумно убедиться в надежности партнера. Ваша предусмотрительность поможет избежать многих проблем и построить действительно счастливые отношения.`
    }
  ];

  // Сокращенный список доступных услуг
  const availableServices = [
    'Сбор общей информации о партнере',
    'Поиск всех аккаунтов в социальных сетях',
    'Поиск скрытых профилей на сайтах знакомств',
    'Информация о записях в телефонных книгах',
    'Отчет о покупках за последние полгода',
    'Выгрузка скрытых друзей и сообществ ВК'
  ];

  const handleDataChange = useCallback((field: string, value: string) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleTemplateChange = useCallback((templateId: string) => {
    const template = resultTemplates.find(t => t.id === templateId);
    setReportData(prev => ({
      ...prev,
      selectedTemplate: templateId,
      customTemplateText: template ? template.text : ''
    }));
  }, [resultTemplates]);

  const selectedTemplateText = reportData.customTemplateText || 
    resultTemplates.find(t => t.id === reportData.selectedTemplate)?.text || '';

  // Функция экспорта в PDF
  const exportToPDF = useCallback(async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Добавляем активную ссылку
      pdf.link(10, pdfHeight - 30, 100, 10, {url: 'https://vk.com/vernostpro'});
      
      pdf.save(`Отчет_${reportData.analysisNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    } catch (error) {
      console.error('Ошибка при создании PDF:', error);
    }
  }, [reportData.analysisNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 font-['Source_Sans_Pro'] flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        {/* Основная страница отчета */}
        <TabsContent value="report" className="mt-0 flex-1">
          <div id="report-content" className="max-w-4xl mx-auto p-4 lg:p-6">
            {/* Улучшенная шапка с данными клиента */}
            <div className="bg-gradient-to-r from-white via-pink-50 to-purple-50 rounded-xl shadow-xl mb-6 p-6 border border-pink-200">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Дата: {reportData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Hash" className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{reportData.analysisNumber}</span>
                    </div>
                  </div>
                  
                  {/* Данные клиента в шапке */}
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                      <Icon name="User" className="w-4 h-4" />
                      Данные тестируемого
                    </h3>
                    <div className="text-purple-800 font-medium">
                      {reportData.clientData || 'Номер телефона, VK ID или Telegram username не указан'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={exportToPDF}
                    variant="outline"
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Icon name="Hearts" className="w-4 h-4 mr-2" />
                    Экспорт PDF
                  </Button>
                  <Button
                    onClick={() => setActiveTab('settings')}
                    variant="outline"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Icon name="Heart" className="w-4 h-4 mr-2" />
                    Верность.Про
                  </Button>
                </div>
              </div>
            </div>

            {/* Улучшенный блок результата и анализа */}
            <Card className="mb-6 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon name="FileText" className="w-6 h-6" />
                  Результат и анализ проведенного теста
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-br from-white to-purple-50">
                <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                  {selectedTemplateText || 'Результат анализа будет отображен здесь после выбора шаблона в настройках.'}
                </div>
              </CardContent>
            </Card>

            {/* Максимально привлекательный блок мини-проверки */}
            <Card className="mb-6 shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
              <CardHeader className="text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                  <CardTitle className="text-2xl lg:text-3xl font-bold mb-2 text-center">
                    💕 Узнай тайны своей половинки! 💕
                  </CardTitle>
                  <p className="text-pink-100 text-center text-lg">
                    Получи 2 бесплатные проверки прямо сейчас!
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-br from-white via-pink-50 to-purple-50">
                <div className="text-center mb-6">
                  <p className="text-gray-800 text-lg font-medium mb-4">
                    🔍 Выбери любые 2 проверки из списка и узнай правду!
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 mb-6 shadow-lg border border-pink-200">
                  <h4 className="font-bold text-gray-900 mb-4 text-center text-lg">
                    📋 Доступные проверки:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 hover:shadow-md transition-all duration-200">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white min-w-fit font-bold">
                          {index + 1}
                        </Badge>
                        <span className="text-gray-800 text-sm font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2 justify-center">
                    <Icon name="Shield" className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800">100% Конфиденциально</span>
                  </div>
                  <p className="text-green-800 text-sm text-center">
                    Полная гарантия тайны. Никто не узнает о проверке!
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 mb-4 font-medium">
                    💬 Напиши в ВК: "Мини-проверка: №1,2" и получи результат!
                  </p>
                  
                  {/* Яркая привлекательная кнопка-ссылка */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <a 
                      href="https://vk.com/vernostpro" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative block"
                    >
                      <Button
                        className="relative bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:via-red-600 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl border-0 w-full sm:w-auto"
                      >
                        <span className="flex items-center justify-center gap-3">
                          <Icon name="MessageCircle" className="w-6 h-6" />
                          🚀 УЗНАТЬ ПРАВДУ СЕЙЧАС! 🚀
                          <Icon name="ExternalLink" className="w-6 h-6" />
                        </span>
                      </Button>
                    </a>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3 font-medium">
                    ⭐ Более 10,000 довольных клиентов уже узнали правду!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Подвал сайта */}
          <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-center py-4 mt-auto">
            <p className="text-gray-400 text-xs">
              © All Rights Reserved. Vernost.Pro 2025.
            </p>
          </footer>
        </TabsContent>

        {/* Вкладка параметров для менеджеров */}
        <TabsContent value="settings" className="mt-0">
          <div className="max-w-6xl mx-auto p-4 lg:p-6">
            <div className="bg-white rounded-xl shadow-xl border border-purple-200">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4 lg:mb-0">
                  <Icon name="Heart" className="w-7 h-7 text-purple-600" />
                  Параметры отчета
                </h1>
                <Button
                  onClick={() => setActiveTab('report')}
                  variant="outline"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg"
                >
                  <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                  К отчету
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Информационная шапка */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon name="Info" className="w-5 h-5 text-blue-600" />
                    Информационная шапка
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-gray-700 font-medium">Дата отчета</Label>
                      <Input
                        id="date"
                        value={reportData.date}
                        onChange={(e) => handleDataChange('date', e.target.value)}
                        placeholder="дд.мм.гг"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Автоматически выставляется сегодняшняя дата</p>
                    </div>
                    <div>
                      <Label htmlFor="analysisNumber" className="text-gray-700 font-medium">Номер анализа</Label>
                      <Input
                        id="analysisNumber"
                        value={reportData.analysisNumber}
                        onChange={(e) => handleDataChange('analysisNumber', e.target.value)}
                        placeholder="№ В/П 01442-25"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Индивидуальный номер для каждого анализа</p>
                    </div>
                  </div>
                </div>

                {/* Данные тестируемого */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon name="User" className="w-5 h-5 text-green-600" />
                    Данные тестируемого
                  </h3>
                  <div>
                    <Label htmlFor="clientData" className="text-gray-700 font-medium">Контактные данные клиента</Label>
                    <Textarea
                      id="clientData"
                      value={reportData.clientData}
                      onChange={(e) => handleDataChange('clientData', e.target.value)}
                      placeholder="Номер телефона, VK ID или Telegram username"
                      className="mt-2 min-h-20"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Введите имеющиеся данные о заказчике: телефон, VK ID, Telegram username
                    </p>
                  </div>
                </div>

                {/* Расширенные шаблоны результатов */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon name="FileText" className="w-5 h-5 text-yellow-600" />
                    Результат анализа теста (15 шаблонов)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="templateSelect" className="text-gray-700 font-medium">Выберите шаблон результата</Label>
                      <Select
                        value={reportData.selectedTemplate}
                        onValueChange={handleTemplateChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите подходящий шаблон результата из 15 вариантов" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {resultTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              #{template.id} - {template.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Поле для редактирования выбранного шаблона */}
                    {reportData.selectedTemplate && (
                      <div>
                        <Label htmlFor="customTemplateText" className="text-gray-700 font-medium">
                          Редактирование выбранного шаблона
                        </Label>
                        <Textarea
                          id="customTemplateText"
                          value={reportData.customTemplateText}
                          onChange={(e) => handleDataChange('customTemplateText', e.target.value)}
                          placeholder="Редактируйте текст шаблона..."
                          className="mt-2 min-h-40"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Изменения автоматически синхронизируются с основной страницей
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="AlertTriangle" className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-800 text-sm">Важное правило</span>
                      </div>
                      <p className="text-red-700 text-sm">
                        Обязательно отправляйте клиентам всегда разные результаты тестов!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Промокод */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon name="Tag" className="w-5 h-5 text-purple-600" />
                    Промокод и настройки
                  </h3>
                  <div>
                    <Label htmlFor="promoCode" className="text-gray-700 font-medium">Промокод для клиента</Label>
                    <Input
                      id="promoCode"
                      value={reportData.promoCode}
                      onChange={(e) => handleDataChange('promoCode', e.target.value)}
                      placeholder="MINI2024"
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Актуальный промокод для предоставления скидки клиенту
                    </p>
                  </div>
                </div>

                {/* Информация о синхронизации */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="RefreshCw" className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-800">Автоматическая синхронизация</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Все изменения автоматически синхронизируются с основной страницей отчета в реальном времени.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;