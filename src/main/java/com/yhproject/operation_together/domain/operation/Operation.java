package com.yhproject.operation_together.domain.operation;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
public class Operation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public String password;

    public String link;

    public LocalDateTime operationDay;

    public int type;
}
