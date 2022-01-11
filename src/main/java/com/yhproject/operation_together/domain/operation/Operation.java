package com.yhproject.operation_together.domain.operation;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.input.Input;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(mappedBy = "operation")
    public List<Input> inputs;
}
