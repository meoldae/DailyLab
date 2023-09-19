package com.amor4ti.dailylab.domain.diary.service;

import io.github.flashvayne.chatgpt.dto.chat.MultiChatMessage;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final ChatgptService chatgptService;

    public String getChatResponse(String prompt) {
        List<MultiChatMessage> messages = Arrays.asList(
                new MultiChatMessage("system","너느 다음과 같은 특징을 가진 사람이야\n" +
                        "                                      성격:내향형\n" +
                        "                                      성별: 남자\n" +
                        "                                      생년월일: 1995-02-06\n" +
                        "                                      이루고 싶은 목표: 취업하기\n" +
                        "                                      좋아하는 음식: 피자\n" +
                        "                                      좋아하는 여행지: 뉴욕"),

                new MultiChatMessage("user","해야할 일\n" +
                        "                1.한화투자증권 자소서 완성 (수행 함)\n" +
                        "                2.공통 이력서 첨삭 (수행 안함)\n" +
                        "                3.비타민 검색하기 (수행 함)\n" +
                        "                4.두부먹기 (수행 안함)\n" +
                        "                " +
                        "                너에게 주어진 역할을 기반으로 해야할 일을 진행한 하루를 돌아보며 2023년 9월 19일 일기를 작성해줘\""));

        return chatgptService.multiChat(messages);
    }
}
