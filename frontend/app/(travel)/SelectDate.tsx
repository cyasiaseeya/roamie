import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import { scaleH } from '@/utils/scale'

const { width } = Dimensions.get('window');

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const SelectDate = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });
  const scrollViewRef = useRef<ScrollView>(null);

  // 월 이름 배열
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // 요일 배열
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  // 해당 월의 첫 번째 날과 마지막 날 구하기
  const getMonthInfo = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    return { firstDay, lastDay, startingDayOfWeek, daysInMonth, year, month };
  };

  // 달력 날짜 배열 생성
  const generateCalendarDays = (date: Date) => {
    const { startingDayOfWeek, daysInMonth, year, month } = getMonthInfo(date);
    const days = [];
    
    // 이전 달의 빈 날짜들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // 날짜 선택 핸들러
  const handleDatePress = (date: Date) => {
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // 새로운 시작 날짜 선택
      setSelectedRange({ startDate: date, endDate: null });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      // 끝 날짜 선택
      if (date >= selectedRange.startDate) {
        setSelectedRange({ ...selectedRange, endDate: date });
      } else {
        // 시작 날짜보다 이전 날짜를 선택한 경우, 새로운 시작 날짜로 설정
        setSelectedRange({ startDate: date, endDate: null });
      }
    }
  };

  // 날짜가 선택된 범위에 포함되는지 확인
  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate) return false;
    if (!selectedRange.endDate) return date.getTime() === selectedRange.startDate.getTime();
    
    return date >= selectedRange.startDate && date <= selectedRange.endDate;
  };

  // 날짜가 시작 또는 끝 날짜인지 확인
  const isStartOrEndDate = (date: Date) => {
    return (selectedRange.startDate && date.getTime() === selectedRange.startDate.getTime()) ||
           (selectedRange.endDate && date.getTime() === selectedRange.endDate.getTime());
  };

  // 이전/다음 달로 이동
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  // 오늘 날짜인지 확인
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const renderCalendar = (date: Date) => {
    const days = generateCalendarDays(date);
    const { year, month } = getMonthInfo(date);

    return (
      <View className="bg-white p-4 mx-4 rounded-2xl shadow-lg mb-6" style={{ width: width - 32 }}>
        {/* 월/년도 헤더 */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity 
            onPress={() => navigateMonth('prev')}
            className="p-2 rounded-full bg-gray-100"
          >
            <Text className="text-lg font-semibold text-gray-600">‹</Text>
          </TouchableOpacity>
          
          <Text className="text-xl font-bold text-gray-800">
            {year}년 {monthNames[month]}
          </Text>
          
          <TouchableOpacity 
            onPress={() => navigateMonth('next')}
            className="p-2 rounded-full bg-gray-100"
          >
            <Text className="text-lg font-semibold text-gray-600">›</Text>
          </TouchableOpacity>
        </View>

        {/* 요일 헤더 */}
        <View className="flex-row mb-2">
          {dayNames.map((day, index) => (
            <View key={day} className="flex-1 items-center py-2">
              <Text className={`text-sm font-medium ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'}`}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* 날짜 그리드 */}
        <View className="flex-row flex-wrap">
          {days.map((day, index) => {
            if (!day) {
              return <View key={index} className="w-1/7 aspect-square" style={{ width: '14.28%' }} />;
            }

            const inRange = isDateInRange(day);
            const isStartEnd = isStartOrEndDate(day);
            const todayDate = isToday(day);

            return (
              <TouchableOpacity
                key={day.getTime()}
                onPress={() => handleDatePress(day)}
                className="aspect-square items-center justify-center"
                style={{ width: '14.28%' }}
              >
                <View 
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    isStartEnd 
                      ? 'bg-blue-500' 
                      : inRange 
                        ? 'bg-blue-100' 
                        : todayDate 
                          ? 'bg-gray-200' 
                          : ''
                  }`}
                >
                  <Text 
                    className={`text-base font-medium ${
                      isStartEnd 
                        ? 'text-white' 
                        : inRange 
                          ? 'text-blue-600' 
                          : todayDate 
                            ? 'text-gray-800' 
                            : 'text-gray-700'
                    }`}
                  >
                    {day.getDate()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: scaleH(56) }}>
      {/* 헤더 */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800 mb-2">날짜 선택</Text>
        <Text className="text-sm text-gray-600">
          {selectedRange.startDate && selectedRange.endDate
            ? `${selectedRange.startDate.getMonth() + 1}월 ${selectedRange.startDate.getDate()}일 - ${selectedRange.endDate.getMonth() + 1}월 ${selectedRange.endDate.getDate()}일`
            : selectedRange.startDate
              ? `시작: ${selectedRange.startDate.getMonth() + 1}월 ${selectedRange.startDate.getDate()}일`
              : '시작 날짜를 선택해주세요'
          }
        </Text>
      </View>

      {/* 달력 스크롤 뷰 */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {/* 이전 달 */}
        {renderCalendar(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
        
        {/* 현재 달 */}
        {renderCalendar(currentMonth)}
        
        {/* 다음 달 */}
        {renderCalendar(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
      </ScrollView>

      {/* 하단 버튼 */}
      {selectedRange.startDate && selectedRange.endDate && (
        <View className="bg-white px-6 py-4 border-t border-gray-200">
          <TouchableOpacity className="bg-blue-500 py-4 rounded-xl">
            <Text className="text-white text-center text-lg font-semibold">
              날짜 확인
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SelectDate;