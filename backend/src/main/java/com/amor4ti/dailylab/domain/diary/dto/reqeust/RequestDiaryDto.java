package com.amor4ti.dailylab.domain.diary.dto.reqeust;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class RequestDiaryDto {
    private String gender;
    private LocalDate birthday;
    private String job;
    private String goal;
    private String religion;

    private List<DiaryTodos> todos;
    private Map<String, String> emotionCountPerHour;
    public static RequestDiaryDto of(Member member,
                                     List<DiaryTodos> todos,
                                     Map<String, String> emotionCountPerHour) {

        return RequestDiaryDto.builder()
                              .gender(member.getGender())
                              .birthday(member.getBirthday())
                              .job(member.getJob())
                              .goal(member.getGoal())
                              .religion(member.getReligion())
                              .todos(todos)
                              .emotionCountPerHour(emotionCountPerHour)
                              .build();
    }
}
