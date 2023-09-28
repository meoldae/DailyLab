package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.member.dto.MemberInfoDto;
import com.amor4ti.dailylab.domain.member.dto.QMemberInfoDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;

import java.util.List;

import static com.amor4ti.dailylab.domain.entity.QMbti.mbti;
import static com.amor4ti.dailylab.domain.entity.QMember.member;

public class MemberCustomRepositoryImpl implements MemberCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public MemberCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }



    @Override
    public MemberInfoDto findMemberInfoDtoByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(new QMemberInfoDto(
                    member.memberId, member.username, member.gender, member.birthday,
                        member.job, member.religion,
                        mbtiTypeAExpression, mbtiTypeBExpression, mbtiTypeCExpression, mbtiTypeDExpression
                ))
                .from(member)
                .join(mbti)
                .on(member.mbtiId.eq(mbti.mbtiId))
                .where(memberIdEquals(memberId))
                .fetchOne();
    }

    @Override
    public List<Long> findMemberByGenderAndAge(String gender, Integer currentYear, Integer age) {
        return jpaQueryFactory
                .select(member.memberId)
                .from(member)
                .where(member.gender.eq(gender)
                .and((member.birthday.year().subtract(currentYear)).abs().divide(10).floor().eq(age)))
                .fetch();
    }

    private final Expression<String> mbtiTypeAExpression = new CaseBuilder()
            .when(mbti.typeA.eq(1)).then("I")
            .when(mbti.typeA.eq(2)).then("E")
            .otherwise(Expressions.nullExpression(String.class));

    private final Expression<String> mbtiTypeBExpression = new CaseBuilder()
            .when(mbti.typeB.eq(1)).then("S")
            .when(mbti.typeB.eq(2)).then("N")
            .otherwise(Expressions.nullExpression(String.class));

    private final Expression<String> mbtiTypeCExpression = new CaseBuilder()
            .when(mbti.typeC.eq(1)).then("T")
            .when(mbti.typeC.eq(2)).then("F")
            .otherwise(Expressions.nullExpression(String.class));

    private final Expression<String> mbtiTypeDExpression = new CaseBuilder()
            .when(mbti.typeD.eq(1)).then("P")
            .when(mbti.typeD.eq(2)).then("J")
            .otherwise(Expressions.nullExpression(String.class));

    private BooleanExpression memberIdEquals(Long memberId) {
        return member.memberId.eq(memberId);
    }
}
