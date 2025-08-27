import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('report');
  
  // Состояние для синхронизации данных между вкладками
  const [reportData, setReportData] = useState({
    date: new Date().toLocaleDateString('ru-RU'),
    analysisNumber: '№ В/П 01442-25',
    clientName: '[Имя клиента]',
    clientData: '',
    selectedTemplate: '',
    promoCode: 'MINI2024',
  });

  // Шаблонные тексты результатов
  const resultTemplates = [
    {
      id: '1',
      title: 'Высокий уровень доверия',
      text: `Здравствуйте, ${reportData.clientName}!
Мы внимательно проанализировали все ваши ответы на вопросы теста. В целом, ваши отношения демонстрируют достаточно высокий уровень доверия и взаимопонимания, что всегда является отличной основой для стабильности пары. Вместе с тем, некоторые нюансы в поведении вашего партнёра и реакции на важные моменты могут наводить на размышления. Внимание к таким деталям — естественная часть любого близкого союза, ведь люди меняются, а вместе с ними меняются и отношения. Иногда именно такие «маленькие знаки» помогают взглянуть на ситуацию глубже. Если вы чувствуете, что хотели бы немного больше уверенности, стоит задуматься о том, чтобы получить более полный и объективный анализ — это поможет сохранить спокойствие и гармонию в паре.`
    },
    {
      id: '2', 
      title: 'Скрытая напряженность',
      text: `Здравствуйте, ${reportData.clientName}!
Ваши ответы свидетельствуют о том, что в ваших отношениях присутствует доверие, но также встречаются и небольшие признаки скрытой напряжённости или вопросов, которые остаются на поверхности. Это абсолютно нормальное явление, ведь в длительных отношениях важно не только доверять, но и понимать, что иногда мы можем по-разному воспринимать одни и те же события. Ваши наблюдения, чувства и интуиция — ценный ресурс, который помогает поддерживать связь и разбираться в сложных ситуациях. Психологически доказано, что именно такое внимание к деталям сохраняет отношения в долгосрочной перспективе. В случае если вам захочется прояснить некоторые моменты объективно, обращение к экспертам по проверке партнёров может помочь увидеть те оттенки, которые остаются за рамками обычного восприятия.`
    },
    {
      id: '3',
      title: 'Элементы неопределенности', 
      text: `Здравствуйте, ${reportData.clientName}!
После тщательного изучения ваших ответов мы видим, что ваши отношения имеют как положительные стороны, так и элементы неопределённости, вызывающие внутренние вопросы. Это естественно — все пары проходят через периоды, когда баланс доверия колеблется, а эмоции и мысли становятся более насыщенными и противоречивыми. Иногда именно в такие моменты стоит уделить внимание не только чувствам, но и объективным фактам, которые помогают сделать более ясные выводы. Обратите внимание на свою интуицию и стремление разобраться — именно это помогает сохранить близость и обрести уверенность в будущем.`
    }
  ];

  // Список доступных услуг
  const availableServices = [
    'Сбор общей информации о партнере - Выгрузка всех номеров, электронных почт, адресов, дополнительных аккаунтов в мессенджерах Вотсаб и Телеграм и иная доступная информация о второй половине.',
    'Поиск всех аккаунтов в социальных сетях в том числе скрытых и удаленных профилей.',
    'Поиск скрытых аккаунтов, профилей и анкет на всех сервисах и сайтах знакомств и флирта.',
    'Информационный отчет, о том, как записан ваш партнер у других людей в записной книжке.',
    'Отчет о покупках вашей второй половины за последние полгода: Найдем и структурируем подробный отчет о совершенных покупках вашей второй половины в розничных магазинах и интернет-ресурсах.',
    'Выгрузка скрытых друзей и сообществ в ВК сообществе: Найдем и структурируем подробный отчет о совершенных покупках вашей второй половины в розничных магазинах и интернет-ресурсах.'
  ];

  const handleDataChange = (field: string, value: string) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectedTemplateText = resultTemplates.find(t => t.id === reportData.selectedTemplate)?.text || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-['Source_Sans_Pro']">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Основная страница отчета */}
        <TabsContent value="report" className="mt-0">
          <div className="max-w-4xl mx-auto p-6">
            {/* Шапка с кнопкой перехода в параметры */}
            <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Дата отчета: {reportData.date}</span>
                    <span>{reportData.analysisNumber}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveTab('settings')}
                  variant="outline"
                  className="bg-blue-600 text-white hover:bg-blue-700 border-0"
                >
                  <Icon name="Settings" className="w-4 h-4 mr-2" />
                  Верность.Про
                </Button>
              </div>
              
              {/* Данные тестируемого */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Данные тестируемого</h3>
                <div className="text-gray-600">
                  {reportData.clientData || 'Номер телефона, VK ID или Telegram username не указан'}
                </div>
              </div>
            </div>

            {/* Блок результата и анализа */}
            <Card className="mb-6 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="w-5 h-5" />
                  Результат и анализ проведенного теста
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  {selectedTemplateText || 'Результат анализа будет отображен здесь после выбора шаблона в настройках.'}
                </div>
              </CardContent>
            </Card>

            {/* Блок предложения мини-проверки */}
            <Card className="mb-6 shadow-lg border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">
                  Раскрой тайны своей второй половинки и узнай, что она действительно скрывает от тебя!
                </CardTitle>
                <p className="text-indigo-100 text-sm">
                  Получите уникальную возможность пройти бесплатную мини-проверку на верность!
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 mb-4">
                    После успешного прохождения основного теста вы можете выбрать из нашего списка два любых параметра для дополнительной проверки вашей второй половинки бесплатно! Узнайте важную для вас информацию — именно ту, которая поможет вам лучше понять и укрепить ваши отношения. Сделайте шаг навстречу гармонии и доверии уже сегодня!
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Доступные услуги для бесплатной мини-проверки:</h4>
                  <ul className="space-y-3">
                    {availableServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 min-w-fit">
                          {index + 1}
                        </Badge>
                        <span className="text-gray-700 text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Shield" className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Гарантированная конфиденциальность</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Вся информация о проведенной проверке на верность остается гарантированно конфиденциальной только между нами и нашими клиентами. Мы ни при каких обстоятельствах не передаем никакую информацию о наших проверках третьим лицам.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Выберите две проверки, которые для вас наиболее важны и помогут укрепить доверие и гармонию в паре.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Просто напишите номера выбранных проверок в сообщении нашего сообщества ВК — например: "Мини-проверка: №1,2".
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    onClick={() => window.open('https://vk.com/vernostpro', '_blank')}
                  >
                    <Icon name="ExternalLink" className="w-5 h-5 mr-2" />
                    Начать проверку
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка параметров для менеджеров */}
        <TabsContent value="settings" className="mt-0">
          <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Icon name="Settings" className="w-6 h-6" />
                  Параметры отчета
                </h1>
                <Button
                  onClick={() => setActiveTab('report')}
                  variant="outline"
                >
                  <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                  К отчету
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Информационная шапка */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Информационная шапка</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Дата отчета</Label>
                      <Input
                        id="date"
                        value={reportData.date}
                        onChange={(e) => handleDataChange('date', e.target.value)}
                        placeholder="дд.мм.гг"
                      />
                      <p className="text-xs text-gray-500 mt-1">Автоматически выставляется сегодняшняя дата</p>
                    </div>
                    <div>
                      <Label htmlFor="analysisNumber">Номер анализа</Label>
                      <Input
                        id="analysisNumber"
                        value={reportData.analysisNumber}
                        onChange={(e) => handleDataChange('analysisNumber', e.target.value)}
                        placeholder="№ В/П 01442-25"
                      />
                      <p className="text-xs text-gray-500 mt-1">Индивидуальный номер для каждого анализа</p>
                    </div>
                  </div>
                </div>

                {/* Данные тестируемого */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Данные тестируемого</h3>
                  <div>
                    <Label htmlFor="clientData">Контактные данные клиента</Label>
                    <Textarea
                      id="clientData"
                      value={reportData.clientData}
                      onChange={(e) => handleDataChange('clientData', e.target.value)}
                      placeholder="Номер телефона, VK ID или Telegram username"
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Введите имеющиеся данные о заказчике: телефон, VK ID, Telegram username
                    </p>
                  </div>
                </div>

                {/* Шаблоны результатов */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Результат анализа теста</h3>
                  <div className="mb-4">
                    <Label htmlFor="templateSelect">Выберите шаблон результата</Label>
                    <Select
                      value={reportData.selectedTemplate}
                      onValueChange={(value) => handleDataChange('selectedTemplate', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите подходящий шаблон результата" />
                      </SelectTrigger>
                      <SelectContent>
                        {resultTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedTemplateText && (
                    <div className="bg-white rounded border p-3">
                      <Label>Предварительный просмотр:</Label>
                      <div className="text-sm text-gray-600 mt-2 max-h-40 overflow-y-auto">
                        {selectedTemplateText}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-red-50 border border-red-200 rounded p-3 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="AlertTriangle" className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-800 text-sm">Важное правило</span>
                    </div>
                    <p className="text-red-700 text-sm">
                      Обязательно необходимо отправлять клиентам всегда разные результаты тестов!
                    </p>
                  </div>
                </div>

                {/* Промокод */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Промокод и настройки</h3>
                  <div>
                    <Label htmlFor="promoCode">Промокод для клиента</Label>
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
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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